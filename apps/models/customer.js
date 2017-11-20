'use strict'

module.exports = (db) => {
    let schema = {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        password: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        address: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        phone: {
            type: Sequelize.STRING(255),
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

    let customer = db.getConnection().define('customer', schema, {
        timestamps: true,
        createdAt:'created_date',
        updatedAt: 'updated_date',
        paranoid: false,
        underscored: true,
        freezeTableName: true,
        engine: 'InnoDB',
        charset: 'utf8'
    })

    return customer
}