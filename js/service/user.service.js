class UserService {

    constructor() {
        this.endpoint = 'http://localhost:3000/users';
        this.userSubject = new rxjs.BehaviorSubject([]);
        this.readAll();
    }

    readAll() {
        fetch(this.endpoint)
            .then(
                response => response.json(),
                err => console.err(err)
            ).then(
                users => {
                    this.userSubject.next( this.transform(users) );
                }
            );
    }

    read(id) {
        return fetch(`${this.endpoint}/${id}`)
            .then(
                response => response.json(),
                err => console.err(err)
            ); 
    }

    remove(idOrRow) {
        let id = !idOrRow.id ? idOrRow : idOrRow.id;
        let fetchSetting = {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached,
            credentials: 'include', // include, *same-origin, omit
        };
        return fetch(`${this.endpoint}/${id}`, fetchSetting)
            .then(
                response => response.json(),
                err => console.err(err)
            ).then(
                resp => {
                    this.readAll();
                }
            )
    }

    transform(users) {
        return users.map( user => new User(user) );
    }

    update(row) {
        let fetchSetting = {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached,
            credentials: 'include', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(row) 
        };
        let url = `${this.endpoint}/${row.id}`;
        console.log(url, row, fetchSetting.body);
        fetch(url, fetchSetting)
            .then(
                response => response.json(),
                err => console.error(err)
            ).then(
                r => {
                    console.log(r);
                    this.readAll();
                }
            );
    }

    create(row) {
        let fetchSetting = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached,
            credentials: 'include', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(row) 
        };
        console.log(this.endpoint, row, fetchSetting.body);
        fetch(this.endpoint, fetchSetting)
            .then(
                response => response.json(),
                err => console.error(err)
            ).then(
                r => {
                    console.log(r);
                    this.readAll();
                }
            );
    }

}