'use strict'

module.exports = (db) => {
    let schema = {
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
    }

    let orders_payment = db.getConnection().define('orders_payment', schema, {
        timestamps: true,
        createdAt:'created_date',
        updatedAt: false,
        paranoid: false,
        underscored: true,
        freezeTableName: true,
        engine: 'InnoDB',
        charset: 'utf8'
    })

    return orders_payment
}