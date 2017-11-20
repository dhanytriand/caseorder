'use strict'

exports.get_product = (db, id) => new Promise(
    (resolve, reject) => 
    {
        db.model('product').findOne({
            where: {
                id: id
            }
        }).then((data)=>{
            resolve(data)
        }).catch(reject)
    }
)

exports.update_product = (db,id, data) => new Promise ((resolve, reject)=>{
    db.model('product').update(data,{
        where : {
            id:id
        }
    }).then((data)=>{
        resolve(data)
    }).catch(reject)
})