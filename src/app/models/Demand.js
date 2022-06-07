const Sequelize = require('sequelize');

class Demand extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                client_id: Sequelize.INTEGER,
                menu_id: Sequelize.INTEGER,
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

module.exports = Demand;