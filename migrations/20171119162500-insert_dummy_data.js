'use strict'
module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.bulkInsert('admin',[
            {
                email: 'admin@orderapp.com',
                password: '$iyp2aD$.slqb85gCNKJ1eQjdTVd58F8Db63yK0iVHmizt7hQI04=', //admin
                created_date: new Date,
                updated_date: new Date
            }
        ])
        queryInterface.bulkInsert('customer',[
            {
                email: 'customer@orderapp.com',
                password: '$iyp2aD$.slqb85gCNKJ1eQjdTVd58F8Db63yK0iVHmizt7hQI04=', //admin
                address: 'lorem ipsum dolor sit amit',
                phone: '62891237923',
                created_date: new Date,
                updated_date: new Date
            }
        ])
        queryInterface.bulkInsert('product',[
            {
                name: 'product 1',
                desc: 'lorem ipsum',
                stock: 10,
                price: 50000,
                created_date: new Date,
                updated_date: new Date
            },
            {
                name: 'product 2',
                desc: 'lorem ipsum',
                stock: 5,
                price: 100000,
                created_date: new Date,
                updated_date: new Date
            }
        ])

        queryInterface.bulkInsert('coupon',[
            {
                name: 'coupon precent 1',
                percentage: 10,
                value: 0,
                start_date: '2017-11-01 00:00:00',
                end_date: '2017-11-20 00:00:00',
                created_date: new Date
            },
            {
                name: 'coupon value 1',
                percentage: 0,
                value: 10000,
                start_date: '2017-11-01 00:00:00',
                end_date: '2017-11-20 00:00:00',
                created_date: new Date
            }
        ])

    },
    down: function (queryInterface, Sequelize) {
    }
}