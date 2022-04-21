const Employee = require('../models/Employee');

class EmployeeController {
    async new(req, res) {
        const employee = await Employee.create(req.body);

        return res.json(employee);
    }

    async list(req, res) {
        const employees = await Employee.findAll();

        return res.json(employees);
    }

    async edit(req, res) {
        const id = req.params.id;

        if (!isNaN(id)) {
            const employee = await Employee.findOne({
                where: {
                    id: id
                }
            });

            if (employee && employee.dataValues.isActive !== false) {
                Employee.update({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                },
                {
                    where: {
                        id: id
                    }
                })
                .then(function() {
                    return res.status(200).json({ success: 'Funcionário alterado com sucesso!' });
                });
            } else {
                return res.status(404).json({ error: 'Funcionário não encontrado!' })
            }
        } else {
            return res.status(400).json({ error: 'Id não identificado!' })
        }

        return res.status(204);
    }

    async delete(req, res) {
        const id = req.params.id

        if (!isNaN(id)) {
            const employee = await Employee.findOne({
                where: {
                    id: id
                }
            });

            if (employee && employee.dataValues.isActive !== false) {
                Employee.update({
                    isActive: false,
                    deletedAt: new Date()
                }, {
                    where: {
                        id: id
                    }
                })
                .then(function() {
                    return res.status(200).json({ success: 'Funcionário removido com sucesso!' });
                });
            } else {
                return res.status(404).json({ error: 'Funcionário não encontrado!' })
            }
        } else {
            return res.status(400).json({ error: 'Id não identificado!' })
        }

        return res.status(204);
    }
}

module.exports = new EmployeeController();