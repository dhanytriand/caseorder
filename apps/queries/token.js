'use strict'

let randomstring = require("randomstring")
let crypto = require('crypto')

let search = (db,token, ip, match_ip = false)=> new Promise((resolve, reject)=>{
    db.model('token').findOne({
        where: 
        {
            $and:[
                Sequelize.where(Sequelize.fn('md5', Sequelize.col('token_code')), crypto.createHash('md5').update(token).digest("hex")),
                (!match_ip) ? true : {ip: ip}
            ]
        },
        include: [{
            model: db.model('token_profile'),
            attributes: ['user_id','admin_id','last_activity']
        }],
    }).then((data) => {
        resolve(data)
    }).catch(reject)
})

let search_refresh = (db,refresh_token, ip, match_ip)=> new Promise((resolve, reject)=>{
    db.model('token').findOne({
        where: 
        {
            $and:[
                Sequelize.where(Sequelize.fn('md5', Sequelize.col('refresh_token')), crypto.createHash('md5').update(refresh_token).digest("hex")),
                (!match_ip) ? true : {ip: ip}
            ]
        },
        include: [{
            model: db.model('token_profile'),
            attributes: ['user_id','admin_id','last_activity']
        }],
    }).then((data) => {
        resolve(data)
    }).catch(reject)
})

let insert = (db, token, refresh_token, ip) => new Promise((resolve, reject)=>{
    db.model('token').create({
        token_code: token,
        ip: ip,
        refresh_token : refresh_token
    }).then((data)=>{
        resolve(data)
    })
})

let create_profile = (db, token_id) => new Promise((resolve, reject)=>{
    db.model('token_profile').create({
        token_id: token_id
    }).then((data)=>{
        resolve(data)
    })
})

exports.check = search

exports.insert_log = (db, token_data)=>{
    db.model('token_profile').update({
        last_activity: new Date()
    },{
        where:{
            token_id: token_data.id
        }
    }).then((data)=>{
    })
}

exports.create_log = (db, req, token_id)=>new Promise((resolve, reject)=>{
    if(token_id == 0)
        resolve(null)
    db.model('token_log').create({
        token_id: token_id,
        user_agent : req.headers['user-agent'],
        path: req.url,
        method: req.method.toUpperCase(),
        request: JSON.stringify(req.body)
    }).then((data)=>{
        resolve(data)
    })
})

exports.update_log = (db, id, data, action, end_time, memory_usage, elapse_time, api_version)=>{
    db.model('token_log').update({
        final_action: action,
        response: JSON.stringify(data),
        end_date: end_time,
        memory_usage: memory_usage, 
        time_elapse: elapse_time, 
        api_version: api_version
    },{
        where:{
            id: id
        }
    }).then((data)=>{
    })
}

exports.refresh = bluebird.coroutine(function *(db, refresh_token, token, ip, match_ip){
    let cek = yield search(db,token,ip,match_ip)
    if(cek != null)
    {
        if(cek.refresh_token != refresh_token){
            throw (new MyError("Mismatch token",408))
            return
        }
        let token_code = randomstring.generate()
        let cek_new = null
        do
        {
            cek_new = yield search(db, token_code)
            if(cek_new != null && cek_new.id == cek.id)
            {
                token_code = randomstring.generate()
                cek_new = null
            }
        }
        while(cek_new != null)
        let dt = new Date()
        dt.setDate(dt.getDate() + 1)
        cek.token_code = token_code
        cek.expired_date = dt
        db.model('token').update({
            expired_date: dt,
            token_code: token_code
        },{
            where:{
                id: cek.id
            }
        }).then((data)=>{
        })
        return cek
    }
    else
        throw (new MyError("Mismatch token",408))
})

exports.update_activity = (db, token_data)=>{
    let dt = new Date()
    dt.setDate(dt.getDate() + 1)
    db.model('token').update({
        expired_date: dt
    },{
        where:{
            id: token_data.id
        }
    }).then((data)=>{
    })
    db.model('token_profile').update({
        last_activity: new Date()
    },{
        where:{
            token_id: token_data.id
        }
    }).then((data)=>{
    })
}

exports.generate = bluebird.coroutine(function *(db, ip) {
    let cek = 0
    let token_code = randomstring.generate()
    while(cek != null)
    {
        cek = yield search(db, token_code)
        if(cek != null)
            token_code = randomstring.generate()
    }

    cek = 0
    let refresh_token = randomstring.generate()
    while(cek != null)
    {
        cek = yield search_refresh(db, refresh_token)
        if(cek != null)
            refresh_token = randomstring.generate()
    }
    let token = yield insert(db, token_code, refresh_token, ip)
    yield create_profile(db,token.id)
    return token
})

exports.update_token_profile = (db, user_id, token_id) => {
    db.model('token_profile').update({
        user_id: user_id
    }, {
        where:{
            token_id: token_id
        }
    }).then((data) => {
        data
    })
}
//GET USER DATA
let get_data_user_by_id = (db, user_id) => new Promise((resolve, reject) => {
    db.model('user').findOne({
        where: {
            id: user_id
        },
        attributes: ['id', 'spice_id', 'unique_id', 'fullname', 'gender', 'birthdate', 'city_id', 'valid_phone_number', 'valid_email', 'subscribe', 'point', 'registration_date', 'register_cell_id', 'profile_picture', 'insert_date']
    }).then((data) => {
        resolve(data)
    }).catch(reject)
})

exports.get_user_data = bluebird.coroutine(function *(db, token, ip, match_ip) {
    let cek = yield search(db, token, ip, match_ip)
    if(cek != null) {
        if(cek.token_profile.user_id == null) {
            throw new MyError("Sesi kamu telah berakhir, mohon login ulang.",407)
        }
        let data = yield get_data_user_by_id(db, cek.token_profile.user_id)
        data['token_id'] = cek.id
        return data
    }else{
        throw new MyError("Mismatch token",408)
    }
})

// query ini buat ngecek user login atau belum karena ada page yang butuh user login dan tidak login

exports.get_user_data_not_login = bluebird.coroutine(function *(db, token, ip, match_ip) {
    let cek = yield search(db, token, ip, match_ip)
    if(cek != null) {
        if(cek.token_profile.user_id == null) {
            return
        }
        let data = yield get_data_user_by_id(db, cek.token_profile.user_id)
        data['token_id'] = cek.id
        return data
    }else{
        throw new MyError("Mismatch token",408)
    }
})

//latest location
exports.update_token_location = (db, location, token_id) => {
    db.model('token').update({
        latest_location: location
    }, {
        where:{
            token_id: token_id
        }
    }).then((data) => {
        data
    })
}