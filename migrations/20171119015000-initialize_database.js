'use strict'

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.createTable('token',{
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            ip: {
                type: Sequelize.STRING(50),
                allowNull: true
            },
            token_code: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            refresh_token: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            created_date: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: new Date()
            },
            expired_date: {
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
                queryInterface.addIndex('token', ['id'])
            ]
        })

        queryInterface.createTable('token_log',{
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            token_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            user_agent: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            path: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            method: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            request: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            response: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            final_action: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            start_date: {
                type: Sequelize.DATE,
                allowNull: true
            },
            memory_usage: {
                type: Sequelize.FLOAT(18,8),
                allowNull: true
            },
            time_elapse: {
                type: Sequelize.FLOAT(18,8),
                allowNull: true
            },
            api_version: {
                type: Sequelize.STRING(255),
                allowNull: true
            }
        },{
            freezeTableName: true,
            engine: 'InnoDB',
            charset: 'utf8'
        }).then(function () {
            return [
                queryInterface.addIndex('token_log', ['id'])
            ]
        })

        queryInterface.createTable('token_profile',{
            token_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            admin_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            created_date: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: new Date()
            },
            last_activity: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: new Date()
            }
        }, {
            freezeTableName: true,
            engine: 'InnoDB',
            charset: 'utf8'
        }).then(function () {
            return [
                queryInterface.addIndex('token_profile', ['token_id'])
            ]
        })

        queryInterface.createTable('customer',{
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
        }, {
            freezeTableName: true,
            engine: 'InnoDB',
            charset: 'utf8'
        }).then(function () {
            return [
                queryInterface.addIndex('customer', ['id'])
            ]
        })

        queryInterface.createTable('admin',{
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
        }, {
            freezeTableName: true,
            engine: 'InnoDB',
            charset: 'utf8'
        }).then(function () {
            return [
                queryInterface.addIndex('admin', ['id'])
            ]
        })

        queryInterface.createTable('product',{
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
            desc: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            stock: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            created_date: {
                type: Sequelize.DATE,
                allowNull: true
            },
            updated_date: {
                type: Sequelize.DATE,
                allowNull: true
            }
        }, {
            freezeTableName: true,
            engine: 'InnoDB',
            charset: 'utf8'
        }).then(function () {
            return [
                queryInterface.addIndex('product', ['id'])
            ]
        })

        queryInterface.createTable('orders',{
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
                type: Sequelize.ENUM('pending','ordered','paid','shipping','completed','canceled'),
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
        }, {
            freezeTableName: true,
            engine: 'InnoDB',
            charset: 'utf8'
        }).then(function () {
            return [
                queryInterface.addIndex('orders', ['id','user_id'])
            ]
        })

        queryInterface.createTable('orders_detail',{
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
        }, {
            freezeTableName: true,
            engine: 'InnoDB',
            charset: 'utf8'
        }).then(function () {
            return [
                queryInterface.addIndex('orders_detail', ['id'])
            ]
        })

        queryInterface.createTable('orders_shipment',{
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
        }, {
            freezeTableName: true,
            engine: 'InnoDB',
            charset: 'utf8'
        }).then(function () {
            return [
                queryInterface.addIndex('orders_shipment', ['id','orders_id'])
            ]
        })

        queryInterface.createTable('coupon',{
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
        }, {
            freezeTableName: true,
            engine: 'InnoDB',
            charset: 'utf8'
        }).then(function () {
            return [
                queryInterface.addIndex('coupon', ['id'])
            ]
        })
    },
    down: function (queryInterface, Sequelize) {
        queryInterface.dropTable('token')
        queryInterface.dropTable('token_log')
        queryInterface.dropTable('token_profile')
        queryInterface.dropTable('customer')
        queryInterface.dropTable('admin')
        queryInterface.dropTable('product')
        queryInterface.dropTable('orders')
        queryInterface.dropTable('orders_detail')
        queryInterface.dropTable('orders_shipment')
        queryInterface.dropTable('coupon')
    }
}