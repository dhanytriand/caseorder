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
        created_date: {
            type: Sequelize.DATE,
            allowNull: true
        },
        updated_date: {
            type: Sequelize.DATE,
            allowNull: true
        }
    }

    let admin = db.getConnection().define('admin', schema, {
        timestamps: true,
        createdAt:'created_date',
        updatedAt: 'updated_date',
        paranoid: false,
        underscored: true,
        freezeTableName: true,
        engine: 'InnoDB',
        charset: 'utf8'
    })

    return admin
}