'use strict'

exports.get = (req, res, next) => {
    bluebird.coroutine(function*() {
        let device_id = ''
        let device_type = ''
        console.log(req.body);
        if(req.body != undefined && req.body.device_id != undefined && req.body.device_type != undefined) {
            device_id = req.body.device_id
            device_type = req.body.device_type
        }
        let token_query = req.queries('token')
        let token = yield token_query.generate(req.db, req.ip, device_id, device_type)
        res.success({token: token})
    })().catch(next)
}

exports.refresh = (req, res, next) => {
    console.log('XHR', req.xhr)
    return bluebird.coroutine(function *() {
        let param = ['refresh_token', 'token']
        req.validate(req, param)

        let device_id = ''
        // console.log(req.body)
        if(req.body != undefined && req.body.device_id != undefined) {
            device_id = req.body.device_id
        }
        let token = req.body.token
        let refresh_token = req.body.refresh_token
        let token_query = req.queries('token')
        let cek = yield token_query.refresh(req.db, refresh_token, token, req.ip, device_id, myConfig.token_match_ip)
        let res_data = {
            created_date: cek.created_date,
            expired_date: cek.expired_date,
            id: cek.id,
            token_code: cek.token_code,
            ip: cek.ip,
            refresh_token: cek.refresh_token,
            device_id: cek.device_id,
            device_type: cek.device_type
        }
        res.success({token: res_data})
    })().catch(next)
}

//[need to be disabled at production, except want to provide token checker]
exports.check = (req, res, next) =>{
    console.log('XHR',req.xhr)
    return bluebird.coroutine(function *(){
        let param = ['token']
        req.validate(req, param)
        
        //yg di database OxHfalxeUt6vZ7XWsXSb31cqxXZ33KuF
        // let token = "oxHfalxeUt6vZ7XWsXSb31cqxXZ33KuF"
        let token = req.body.token
        let token_query = req.queries('token')
        let cek = yield token_query.check(req.db, token, req.ip, myConfig.token_match_ip)
        res.success({data: cek})
    })().catch(next)
}