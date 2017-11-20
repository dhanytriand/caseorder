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
        product_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        quota: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        subtotal: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        created_date: {
            type: Sequelize.DATE,
            allowNull: true
        },
        updated_date: {
            type: Sequelize.DATE,
            allowNull: true
        }
    }

    let orders_detail = db.getConnection().define('orders_detail', schema, {
        timestamps: true,
        createdAt:'created_date',
        updatedAt: 'updated_date',
        paranoid: false,
        underscored: true,
        freezeTableName: true,
        engine: 'InnoDB',
        charset: 'utf8'
    })

    return orders_detail
}