'use strict'

module.exports = (db) => {
    let schema = {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        coupon_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        total_price: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        account_number: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.ENUM('ordered','paid','shipping','completed','canceled'),
            allowNull: true,
            defaultValue: 'ordered'
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

    let orders = db.getConnection().define('orders', schema, {
        timestamps: true,
        createdAt:'created_date',
        updatedAt: 'updated_date',
        paranoid: false,
        underscored: true,
        freezeTableName: true,
        engine: 'InnoDB',
        charset: 'utf8'
    })

    return orders
}