'use strict'

exports.get_customer_data = (db, id) => new Promise(
    (resolve, reject) => 
    {
        db.model('customer').findOne({
            where: {
                id: id
            }
        }).then((data)=>{
            resolve(data)
        }).catch(reject)
    }
)