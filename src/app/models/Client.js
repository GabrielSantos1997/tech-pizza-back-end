const Sequelize = require('sequelize');

class Client extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                isActive: Sequelize.BOOLEAN,
                deletedAt: Sequelize.DATE,
                zipCode: Sequelize.STRING,
                phoneNumber: Sequelize.STRING,
                state: Sequelize.STRING,
                city: Sequelize.STRING,
                address: Sequelize.STRING,
                number: Sequelize.STRING,
                complement: Sequelize.STRING,
            },
            {
                sequelize
            }
        );

        return this
    }
}

module.exports = Client;