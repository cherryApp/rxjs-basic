class DataTable {

    constructor(tableSelector = '', columns = [], rows = [], onUpdate = null, onCreate = null, onDelete = null) {
        this.tableSelector = tableSelector;
        this.columns = columns;
        this.rows = rows;
        this.onUpdate = onUpdate;
        this.onCreate = onCreate;
        this.onDelete = onDelete;

        this.tableElement = document.querySelector(this.tableSelector);
        this.inputTypes = ['text', 'date', 'number', 'color'];

        if (this.tableElement) {
            this.init();
        }
    }

    init() {
        if (!this.rows || !this.columns) {
            return;
        }

        this.setColumns(this.columns);
        this.setRows(this.rows);
        this.setButtons();
    }

    setColumns() {
        let thead = this.tableElement.querySelector('thead');
        if (!thead) {
            thead = document.createElement('thead');
            this.tableElement.appendChild(thead);
        }

        let tr = document.createElement('tr');
        thead.appendChild(tr);
        for (let k in this.columns) {
            let th = document.createElement('th');
            th.innerHTML = this.columns[k].title;
            tr.appendChild(th);
        }

        let last = document.createElement('th');
        thead.appendChild(last);
    }

    setRows(rows) {
        let tbody = this.tableElement.querySelector('tbody');
        if (!tbody) {
            tbody = document.createElement('tbody');
            this.tableElement.appendChild(tbody);
        }

        tbody.innerHTML = '';

        if (this.onCreate) {
            this.adder(tbody);
        }

        for (let k in rows) {
            this.createRow(tbody, rows[k]);
        }

    }

    adder(tbody) {
        let row = {};
        for (let k in this.columns) {
            if (this.columns[k].key === 'id') {
                row.id = 0;
                continue;
            }
            row[this.columns[k].key] = this.columns[k].type === 'number' ? 0 : '';
        }

        this.createRow(tbody, row, true);
    }

    createRow(tbody, row, empty = false) {
        let tr = document.createElement('tr');
        tr.rowData = row;
        tbody.appendChild(tr);

        for (let j in this.columns) {
            let td = document.createElement('td');
            let control = this.getControlByType(row, this.columns[j]);
            td.appendChild(control);
            tr.appendChild(td);
        }

        let td = document.createElement('td');
        if (!empty) {
            td.appendChild( this.setButtons(row) );
        } else {
            let addBtn = document.createElement('button');
            addBtn.className = 'btn btn-success';
            addBtn.innerText = 'add';
            rxjs.fromEvent(addBtn, 'click').subscribe(
                ev => this.onCreate(row)
            );
            td.appendChild(addBtn);
        }
        tr.appendChild( td );
    }

    getControlByType(row, col) {
        if (!col.type || this.inputTypes.includes(col.type)) {
            return this.createInput(col, row);
        }

        switch(col.type) {
            case 'plain': 
                let span = document.createElement('span');
                span.innerText = row[col.key];
                return span;
                break;
            case 'select': 
                return this.createSelect(col, row);
                break;
        }
    }

    createInput(col, row) {
        let input = document.createElement('input');
        input.type = col.type || 'text';
        input.name = col.key;
        input.value = row[col.key];
        input.className = 'form-control';

        rxjs.fromEvent(input, 'change').subscribe( event => {
            row[col.key] = event.target.value;
        });

        return input;
    }

    createSelect(col, row) {
        let select = document.createElement('select');
        select.className = 'form-control';
        for (let option of col.options) {
            let o = document.createElement('option');
            o.value = option.value;
            o.innerText = option.text.slice(0,1).toUpperCase() 
                + option.text.slice(1).toLowerCase();
            select.appendChild(o);
        }

        select.value = row[col.key];
        rxjs.fromEvent(select, 'change').subscribe( event => {
            row[col.key] = event.target.value;
        });

        return select;
    }

    setButtons(row) {
        let group = document.createElement('div');
        group.className = 'btn-group';

        if (this.onUpdate) {
            let updateBtn = document.createElement('button');
            group.appendChild(updateBtn);
            updateBtn.className = 'btn btn-info';
            updateBtn.innerText = 'update';
            rxjs.fromEvent(updateBtn, 'click').subscribe( event => {
                this.onUpdate(row);
            });
        }
        
        if (this.onDelete) {
            let delButton = document.createElement('button');
            group.appendChild(delButton);
            delButton.className = 'btn btn-danger';
            delButton.innerText = 'delete';
            rxjs.fromEvent(delButton, 'click').subscribe( event => {
                this.onDelete(row);
            });
        }

        return group;
    }
}