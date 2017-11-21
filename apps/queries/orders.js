'use strict'

exports.get_orders_detail = (db, id) => new Promise(
    (resolve, reject) => 
    {
        db.model('orders').findOne({
            where: {
                id: id
            }
        }).then((data)=>{
            resolve(data)
        }).catch(reject)
    }
)

exports.insert_orders = (db, data)=> new Promise(
    (resolve, reject) => {
    db.model('orders').create(data).then((data)=>{
        resolve(data)
    })
})

exports.insert_order_payment = (db, data)=> new Promise(
    (resolve, reject) => {
    db.model('orders_payment').create(data).then((data)=>{
        resolve(data)
    })
})

exports.insert_orders_detail = (db, data)=> new Promise(
    (resolve, reject) => {
    db.model('orders_detail').create(data).then((data)=>{
        resolve(data)
    })
})

exports.update_orders = (db,id, data) => new Promise ((resolve, reject)=>{
    db.model('orders').update(data,{
        where : {
            id:id
        }
    }).then((data)=>{
        resolve(data)
    }).catch(reject)
})

exports.get_pending_order = (db, user_id) => new Promise(
    (resolve, reject) => 
    {
        db.model('orders').findOne({
            where: {
                user_id: user_id,
                status: 'pending'
            }
        }).then((data)=>{
            resolve(data)
        }).catch(reject)
    }
)

exports.check_product = (db, data) => new Promise(
    (resolve, reject) => 
    {
        db.model('orders_detail').findOne({
            where: {
                orders_id: data.orders_id,
                product_id: data.product_id
            }
        }).then((data)=>{
            resolve(data)
        }).catch(reject)
    }
)

exports.update_orders_detail = (db,id, data) => new Promise ((resolve, reject)=>{
    db.model('orders_detail').update(data,{
        where : {
            id:id
        }
    }).then((data)=>{
        resolve(data)
    }).catch(reject)
})

exports.check_ordered_order = (db, id) => new Promise(
    (resolve, reject) => 
    {
        db.model('orders').findOne({
            where: {
                id: id,
                status: 'ordered'
            }
        }).then((data)=>{
            resolve(data)
        }).catch(reject)
    }
)

exports.get_all_order = (db, user_id) => new Promise(
    (resolve, reject) => 
    {
        db.model('orders').findAll({
            include: [ {
                model: db.model('orders_detail')
            } ],
            where: {
                id: user_id
            }
        }).then((data)=>{
            resolve(data)
        }).catch(reject)
    }
)

// cms

exports.get_list_orders = (db) => new Promise(
    (resolve, reject) => 
    {
        db.model('orders').findAll({
            include: [ {
                model: db.model('customer')
            } ]
        }).then((data)=>{
            resolve(data)
        }).catch(reject)
    }
)

exports.get_orders_detail_cms = (db, id) => new Promise(
    (resolve, reject) => 
    {
        db.model('orders').findAll({
            include: [ {
                model: db.model('orders_detail'),
                include: [ {
                    model: db.model('product')
                } ]
            },{
                model: db.model('coupon')
            } 
            ],
            where: {
                id: id
            }
        }).then((data)=>{
            resolve(data)
        }).catch(reject)
    }
)