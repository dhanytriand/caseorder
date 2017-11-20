'use strict';

exports.index = (req, res, next) => {
    return bluebird.coroutine(function*(){
        let uq = req.queries("admin")
        if(req.session != undefined && req.session.admin_id != undefined && req.session.admin_id != 0){
            let home_page = yield uq.get_home_page(req.db, req.session.admin_id)
            res.redirect(home_page)
        }
        else
            res.redirect(myConfig.login_admin)
    })().catch(next)
}

exports.not_found = (req, res, next) => {
    return bluebird.coroutine(function*(){
        
        res.render('404_cms',{})

    })().catch(next)
}