const Client = require('../models/Client');
const Sequelize = require('sequelize');

class ClientController {
    async new(req, res) {
        const client = await Client.create(req.body);

        return res.json({
            id: client.dataValues.id,
            name: client.dataValues.name,
            email: client.dataValues.email,
            phoneNumber: client.dataValues.phoneNumber,
            zipCode: client.dataValues.zipCode,
            state: client.dataValues.state,
            city: client.dataValues.city,
            address: client.dataValues.address,
            number: client.dataValues.number,
            complement: client.dataValues.complement,
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
                'isActive',
                'zipCode',
                'phoneNumber',
                'state',
                'city',
                'address',
                'number',
                'complement',
            ]
        };

        var search = req.query.search;
        var name = req.query.name;
        var email = req.query.email;

        if (search && !name && !email && !occupation && !code) {
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

        const clients = await Client.findAll(query);

        return res.json(clients);
    }

    async edit(req, res) {
        const id = req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Id não identificado!' });
        }

        const client = await Client.findOne({
            where: {
                id: id,
                isActive: true
            }
        });

        if (!client) {
            return res.status(404).json({ error: 'Cliente não encontrado!' })
        }

        Client.update({
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            zipCode: req.body.zipCode,
            state: req.body.state,
            city: req.body.city,
            address: req.body.address,
            number: req.body.number,
            complement: req.body.complement,
        }, {
            where: {
                id: id
            }
        })
        .then(function() {
            return res.status(200).json({ success: 'Cliente alterado com sucesso!' });
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

        const client = await Client.findOne({
            where: {
                id: id,
                isActive: true
            },
            attributes: [
                'id',
                'name',
                'email',
                'isActive',
                'zipCode',
                'phoneNumber',
                'state',
                'city',
                'address',
                'number',
                'complement',
            ]
        });

        if (!client) {
            return res.status(404).json({ error: 'Cliente não encontrado!' })
        }

        return res.json(client);
    }

    async delete(req, res) {
        const id = req.params.id

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Id não identificado!' });
        }

        const client = await Client.findOne({
            where: {
                id: id,
                isActive: true
            }
        });

        if (!client) {
            return res.status(404).json({ error: 'Cliente não encontrado!' });
        }

        Client.update({
            isActive: false,
            deletedAt: new Date()
        }, {
            where: {
                id: id
            }
        })
        .then(function() {
            return res.status(200).json({ success: 'Cliente removido com sucesso!' });
        }).catch((error) => {
            return res.status(500).json({ error: error });
        })

        return res.status(204);
    }
}

module.exports = new ClientController();