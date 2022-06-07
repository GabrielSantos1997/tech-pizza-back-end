const Sequelize = require('sequelize');

class Menu extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                title: Sequelize.STRING,
                price: Sequelize.STRING,
                description: Sequelize.STRING,
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

module.exports = Menu;