'use strict'

exports.check = (db, req) => new Promise((resolve, reject)=>{
    bluebird.coroutine(function*(){
        let uq = req.queries("admin")
        let res = true
        res = yield uq.check_user_access(db, req.session.admin_id, req.url)
        resolve(res)
    })()
})