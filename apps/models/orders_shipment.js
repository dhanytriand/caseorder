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
        shipment_no: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.ENUM('processed','on going','arrived'),
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

    let orders_shipment = db.getConnection().define('orders_shipment', schema, {
        timestamps: true,
        createdAt:'created_date',
        updatedAt: 'updated_date',
        paranoid: false,
        underscored: true,
        freezeTableName: true,
        engine: 'InnoDB',
        charset: 'utf8'
    })

    return orders_shipment
}