'use strict'

exports.get_coupons = (db, name) => new Promise(
    (resolve, reject) => 
    {
        db.model('coupon').findOne({
            where: {
                name: name,
                start_date: {
                    $gte: new Date()
                },
                end_date: {
                    $lte: new Date()
                }
            }
        }).then((data)=>{
            resolve(data)
        }).catch(reject)
    }
)

exports.update_coupon = (db,id, data) => new Promise ((resolve, reject)=>{
    db.model('orders_detail').update(data,{
        where : {
            id:id
        }
    }).then((data)=>{
        resolve(data)
    }).catch(reject)
})