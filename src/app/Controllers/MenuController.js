const Menu = require('../models/Menu');
const Sequelize = require('sequelize');

class MenuController {
    async new(req, res) {
        const menu = await Menu.create(req.body);

        return res.json({
            id: menu.dataValues.id,
            title: menu.dataValues.title,
            price: menu.dataValues.price,
            description: menu.dataValues.description,
            createdAt: menu.dataValues.createdAt,
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
                'title',
                'price',
                'description',
                'isActive',
                'createdAt',
            ]
        };

        var search = req.query.search;
        var title = req.query.title;
        var description = req.query.description;

        if (search && !title && !description) {
            query.where = {
                ...query.where,
                [Op.or]: [
                    {
                        title: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        description: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
             }
        }

        if (title) {
            query.where.title = {
                [Op.like]: `%${title}%`
            }
        }

        if (description) {
            query.where.description = {
                [Op.like]: `%${description}%`
            }
        }

        const menus = await Menu.findAll(query);

        return res.json(menus);
    }

    async edit(req, res) {
        const id = req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Id não identificado!' });
        }

        const menu = await Menu.findOne({
            where: {
                id: id,
                isActive: true
            }
        });

        if (!menu) {
            return res.status(404).json({ error: 'Cardápio não encontrado!' })
        }

        Menu.update({
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
        }, {
            where: {
                id: id
            }
        })
        .then(function() {
            return res.status(200).json({ success: 'Cardápio alterado com sucesso!' });
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

        const menu = await Menu.findOne({
            where: {
                id: id,
                isActive: true
            },
            attributes: [
                'id',
                'title',
                'price',
                'description',
                'isActive',
                'createdAt',
            ]
        });

        if (!menu) {
            return res.status(404).json({ error: 'Cardápio não encontrado!' })
        }

        return res.json(menu);
    }

    async delete(req, res) {
        const id = req.params.id

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Id não identificado!' });
        }

        const menu = await Menu.findOne({
            where: {
                id: id,
                isActive: true
            }
        });

        if (!menu) {
            return res.status(404).json({ error: 'Cardápio não encontrado!' });
        }

        Menu.update({
            isActive: false,
            deletedAt: new Date()
        }, {
            where: {
                id: id
            }
        })
        .then(function() {
            return res.status(200).json({ success: 'Cardápio removido com sucesso!' });
        }).catch((error) => {
            return res.status(500).json({ error: error });
        })

        return res.status(204);
    }
}

module.exports = new MenuController();