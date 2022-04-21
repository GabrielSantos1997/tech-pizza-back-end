const User = require('../models/User');

class UserController {
    async new(req, res) {
        const user = await User.create(req.body);

        return res.json({
            id: user.dataValues.id,
            name: user.dataValues.name,
            email: user.dataValues.email,
            createdAt: user.dataValues.createdAt,
        });
    }

    async list(req, res) {
        const users = await User.findAll({
            where: {
                isActive: true,
            },
            attributes: [
                'id',
                'name',
                'email',
                'createdAt',
            ]
        });

        return res.json(users);
    }

    async edit(req, res) {
        const id = req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Id não identificado!' });
        }

        const user = await User.findOne({
            where: {
                id: id,
                isActive: true
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado!' })
        }

        User.update({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }, {
            where: {
                id: id
            }
        })
        .then(function() {
            return res.status(200).json({ success: 'Usuário alterado com sucesso!' });
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

        const user = await User.findOne({
            where: {
                id: id,
                isActive: true
            },
            attributes: [
                'id',
                'name',
                'email',
                'createdAt',
            ]
        });

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado!' })
        }

        return res.json(user);
    }

    async delete(req, res) {
        const id = req.params.id

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Id não identificado!' });
        }

        const user = await User.findOne({
            where: {
                id: id,
                isActive: true
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado!' });
        }

        User.update({
            isActive: false,
            deletedAt: new Date()
        }, {
            where: {
                id: id
            }
        })
        .then(function() {
            return res.status(200).json({ success: 'Usuário removido com sucesso!' });
        }).catch((error) => {
            return res.status(500).json({ error: error });
        })

        return res.status(204);
    }
}

module.exports = new UserController();