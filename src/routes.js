const { Router } = require('express');
const routes = new Router();

const UserController = require('./app/Controllers/UserController');
routes.post('/user/new', UserController.new);
routes.get('/user/list', UserController.list);
routes.get('/user/:id/show', UserController.show);
routes.post('/user/:id/edit', UserController.edit);
routes.delete('/user/:id/delete', UserController.delete);

const EmployeeController = require('./app/Controllers/EmployeeController');
routes.post('/employee/new', EmployeeController.new);
routes.get('/employee/list', EmployeeController.list);
routes.post('/employee/:id/edit', EmployeeController.edit);
routes.delete('/employee/:id/delete', EmployeeController.delete);

routes.get('/', (req, res) => {
    res.json({ message: 'hello world' })
})

module.exports = routes;