const Order = require('../models/Demand');
const Sequelize = require('sequelize');

class OrderController {
    async new(req, res) {
        const order = await Order.create(req.body);

        return res.json({
            id: order.dataValues.id,
            client_id: order.dataValues.client_id,
            menu_id: order.dataValues.menu_id,
            createdAt: order.dataValues.createdAt,
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
                'client_id',
                'menu_id',
                'createdAt',
            ]
        };

        var search = req.query.search;
        var client = req.query.client_id;
        var menu = req.query.menu_id;

        if (search && !client && !menu) {
            query.where = {
                ...query.where,
                [Op.or]: [
                    {
                        client: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        menu: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
             }
        }

        if (client) {
            query.where.client = {
                [Op.like]: `%${client}%`
            }
        }

        if (menu) {
            query.where.menu = {
                [Op.like]: `%${menu}%`
            }
        }

        const orders = await Order.findAll(query);

        return res.json(orders);
    }

    async edit(req, res) {
        const id = req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Id não identificado!' });
        }

        const order = await Order.findOne({
            where: {
                id: id,
                isActive: true
            }
        });

        if (!order) {
            return res.status(404).json({ error: 'Pedido não encontrado!' })
        }

        Order.update({
            client_id: req.body.client_id,
            menu_id: req.body.menu_id,
        }, {
            where: {
                id: id
            }
        })
        .then(function() {
            return res.status(200).json({ success: 'Pedido alterado com sucesso!' });
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

        const order = await Order.findOne({
            where: {
                id: id,
                isActive: true
            },
            attributes: [
                'id',
                'client_id',
                'menu_id',
                'createdAt',
            ]
        });

        if (!order) {
            return res.status(404).json({ error: 'Pedido não encontrado!' })
        }

        return res.json(order);
    }

    async delete(req, res) {
        const id = req.params.id

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Id não identificado!' });
        }

        const order = await Order.findOne({
            where: {
                id: id,
                isActive: true
            }
        });

        if (!order) {
            return res.status(404).json({ error: 'Pedido não encontrado!' });
        }

        Order.update({
            isActive: false,
            deletedAt: new Date()
        }, {
            where: {
                id: id
            }
        })
        .then(function() {
            return res.status(200).json({ success: 'Pedido removido com sucesso!' });
        }).catch((error) => {
            return res.status(500).json({ error: error });
        })

        return res.status(204);
    }
}

module.exports = new OrderController();