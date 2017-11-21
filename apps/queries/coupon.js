'use strict'

exports.get_coupons = (db, name) => new Promise(
    (resolve, reject) => 
    {
        db.model('coupon').findOne({
            where: {
                name: name
            }
        }).then((data)=>{
            resolve(data)
        }).catch(reject)
    }
)