'use strict'

module.exports = (db) => {
    let schema = {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        percentage: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        value: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        start_date: {
            type: Sequelize.DATE,
            allowNull: true
        },
        end_date: {
            type: Sequelize.DATE,
            allowNull: true
        },
        created_date: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: new Date()
        }
    }

    let coupon = db.getConnection().define('coupon', schema, {
        timestamps: true,
        createdAt:'created_date',
        updatedAt: false,
        paranoid: false,
        underscored: true,
        freezeTableName: true,
        engine: 'InnoDB',
        charset: 'utf8'
    })

    return coupon
}