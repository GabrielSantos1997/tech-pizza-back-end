const Sequelize = require('sequelize');

const User = require('../models/User');
const Employee = require('../models/Employee');
const Client = require('../models/Client');
const Menu = require('../models/Menu');
const Demand = require('../models/Demand');

const databaseConfig = require('../../config/database');

const models = [User, Employee, Client, Menu, Demand];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);
        models
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models))
    }
}

module.exports = new Database();