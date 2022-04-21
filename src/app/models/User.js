const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.STRING,
                isActive: Sequelize.BOOLEAN,
                deletedAt: Sequelize.DATE,
            },
            {
                sequelize
            }
        );

        return this
    }
}

module.exports = User;