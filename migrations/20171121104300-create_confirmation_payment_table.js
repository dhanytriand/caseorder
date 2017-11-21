'use strict'

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.createTable('orders_payment',{
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            orders_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            bank: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            account_number: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            total_transfer: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            account_name: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            created_date: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: new Date()
            }
        },{
            freezeTableName: true,
            engine: 'InnoDB',
            charset: 'utf8'
        }).then(function () {
            return [
                queryInterface.addIndex('orders_payment', ['id'])
            ]
        })
    },

    down: function (queryInterface, Sequelize) {
         queryInterface.dropTable('orders_payment')
    }
}