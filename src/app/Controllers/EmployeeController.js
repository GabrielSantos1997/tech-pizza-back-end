const Employee = require('../models/Employee');
const Sequelize = require('sequelize');

class EmployeeController {
    async new(req, res) {
        const employee = await Employee.create(req.body);

        return res.json({
            id: employee.dataValues.id,
            name: employee.dataValues.name,
            email: employee.dataValues.email,
            phoneNumber: employee.dataValues.phoneNumber,
            occupation: employee.dataValues.occupation ? employee.dataValues.occupation : "UNSPECIFIED",
        });
    }

    async list(req, res) {
        const Op = Sequelize.Op;

        var query = {
            where: {
                isActive: true
            },
            attributes: [
                'id',
                'name',
                'email',
                'phoneNumber',
                'occupation',
            ]
        };

        var search = req.query.search;
        var name = req.query.name;
        var email = req.query.email;
        var occupation = req.query.occupation;

        if (search && !name && !email && !occupation) {
            query.where = {
                ...query.where,
                [Op.or]: [
                    {
                        name: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        email: {
                            [Op.like]: `%${search}%`
                        }
                     },
                     {
                        occupation: {
                            [Op.like]: `%${search}%`
                        }
                     }
                ]
             }
        }

        if (name) {
            query.where.name = {
                [Op.like]: `%${name}%`
            }
        }

        if (email) {
            query.where.email = {
                [Op.like]: `%${email}%`
            }
        }

        if (occupation) {
            query.where.occupation = {
                [Op.like]: `%${occupation}%`
            }
        }

        const employees = await Employee.findAll(query);

        return res.json(employees);
    }

    async edit(req, res) {
        const id = req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Id não identificado!' });
        }

        const employee = await Employee.findOne({
            where: {
                id: id,
                isActive: true
            }
        });

        if (!employee) {
            return res.status(404).json({ error: 'Funcionário não encontrado!' })
        }

        Employee.update({
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            occupation: req.body.occupation ? req.body.occupation : "UNSPECIFIED",
        }, {
            where: {
                id: id
            }
        })
        .then(function() {
            return res.status(200).json({ success: 'Funcionário alterado com sucesso!' });
        }).catch((error) => {
            return res.status(500).json({ error: error });
        })

        return res.status(204);
    }

    async show(req, res) {
        const id = req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Id não identificado!' });
        }

        const employee = await Employee.findOne({
            where: {
                id: id,
                isActive: true
            },
            attributes: [
                'id',
                'name',
                'email',
                'phoneNumber',
                'occupation',
            ]
        });

        if (!employee) {
            return res.status(404).json({ error: 'Funcionário não encontrado!' })
        }

        return res.json(employee);
    }

    async delete(req, res) {
        const id = req.params.id

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Id não identificado!' });
        }

        const employee = await Employee.findOne({
            where: {
                id: id,
                isActive: true
            }
        });

        if (!employee) {
            return res.status(404).json({ error: 'Funcionário não encontrado!' });
        }

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
        }).catch((error) => {
            return res.status(500).json({ error: error });
        })

        return res.status(204);
    }
}

module.exports = new EmployeeController();