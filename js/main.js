// Get UserService.
const userService = new UserService();

// Get users.
const columns = [
    {title: "ID", key: "id", type: "plain"}, 
    {title: "name", key: "name"}, 
    {title: "email", key: "email"}, 
    {title: "age", key: "age", type: "number"}, 
    {title: "address", key: "address"}
];

const updateFunction = () => {
    // 
};

const dataTable = new DataTable("#userTable", columns, [], 
    userService.update.bind(userService),
    userService.create.bind(userService),
    userService.remove.bind(userService)
);
userService.userSubject.subscribe(
    users => {
        console.log( users );
        if (users.length > 0) {
            console.log('import', users);
            dataTable.setRows(users);
        }
    }
);
