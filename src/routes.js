const { Router } = require('express');
const routes = new Router();

const UserController = require('./app/Controllers/UserController');
routes.get('/user/list', UserController.list);
routes.get('/user/:id/show', UserController.show);
routes.post('/user/new', UserController.new);
routes.put('/user/:id/edit', UserController.edit);
routes.put('/user/:id/change-password', UserController.changePassword);
routes.delete('/user/:id/delete', UserController.delete);

const EmployeeController = require('./app/Controllers/EmployeeController');
routes.get('/employee/list', EmployeeController.list);
routes.get('/employee/:id/show', EmployeeController.show);
routes.post('/employee/new', EmployeeController.new);
routes.put('/employee/:id/edit', EmployeeController.edit);
routes.delete('/employee/:id/delete', EmployeeController.delete);

const ClientController = require('./app/Controllers/ClientController');
routes.get('/client/list', ClientController.list);
routes.get('/client/:id/show', ClientController.show);
routes.post('/client/new', ClientController.new);
routes.put('/client/:id/edit', ClientController.edit);
routes.delete('/client/:id/delete', ClientController.delete);

const MenuController = require('./app/Controllers/MenuController');
routes.get('/menu/list', MenuController.list);
routes.get('/menu/:id/show', MenuController.show);
routes.post('/menu/new', MenuController.new);
routes.put('/menu/:id/edit', MenuController.edit);
routes.delete('/menu/:id/delete', MenuController.delete);

routes.get('/', (req, res) => {
    res.json({ message: 'hello world' })
})

module.exports = routes;