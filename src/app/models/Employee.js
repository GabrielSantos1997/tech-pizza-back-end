const Sequelize = require('sequelize');

class Employee extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                phoneNumber: Sequelize.STRING,
                isActive: Sequelize.STRING,
                occupation: Sequelize.STRING,
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

module.exports = Employee;