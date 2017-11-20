'use strict'

let randomstring = require("randomstring")
let crypto = require('crypto')

exports.update_token_profile = (db, data, token_id) => {
    db.model('token_profile').update(data, {
        where:{
            token_id: token_id
        }
    }).then((data) => {
        data
    })
}

exports.update_user = (db, data, user_id) => {
    db.model('user').update(data, {
        where:{
            id: user_id
        }
    }).then((data) => {
        data
    })
}

exports.update_unique_id = (db, unique_id, user_id) => {
    db.model('user').update({
        unique_id: unique_id
    }, {
        where:{
            id: user_id
        }
    }).then((data) => {
        data
    })
}

exports.get_data_user_by_unique_id = (db, unique_id) => new Promise((resolve, reject) => {
    db.model('user').findOne({
        where: {
            unique_id: unique_id
        },
        attributes: ['id', 'unique_id', 'spice_id', 'fullname', 'gender', 'birthdate', 'city_id', 'valid_phone_number', 'valid_email', 'registration_date', 'register_cell_id', 'profile_picture', 'insert_date']
    }).then((data) => {
        resolve(data)
    }).catch(reject)
})

exports.get_data_user_by_id = (db, user_id) => new Promise((resolve, reject) => {
    db.model('user').findOne({
        where: {
            id: user_id
        },
        attributes: ['id', 'spice_id', 'unique_id', 'fullname', 'gender', 'birthdate', 'city_id', 'valid_phone_number', 'valid_email', 'subscribe', 'registration_date', 'register_cell_id', 'profile_picture', 'insert_date', 'point']
    }).then((data) => {
        resolve(data)
    }).catch(reject)
})

exports.get_data_user = (db, spice_id) => new Promise((resolve, reject) => {
    db.model('user').findOne({
        where: {
            spice_id: spice_id
        },
        // attributes: ['id', 'spice_id', 'unique_id', 'fullname', 'gender', 'birthdate', 'city_id', 'valid_phone_number', 'valid_email', 'registration_date', 'register_cell_id', 'profile_picture', 'insert_date']
    }).then((data) => {
        resolve(data)
    }).catch(reject)
})

exports.insert_user = (db, data) => new Promise(
    (resolve, reject) => {
        db.model('user').create(data).then((data) => {
            resolve(data.get('id'))
        }).catch(reject)
    }
)

//insert subscriber:
exports.insert_subscriber = (db, data) => new Promise(
    (resolve, reject) => {
        db.model('subscriber').create(data).then((data) => {
            resolve(data.get('id'))
        }).catch(reject)
    }
)

exports.update_user_interest = (db, data, wheredata) => new Promise((resolve, reject) => {
    db.model('user_interest').update(data, {
        where:wheredata
    }).then((data) => {
        resolve(data)
    }).catch(reject)
})

exports.check_interest = (db, user_id, interest_id) => new Promise((resolve, reject) => {
    db.model('user_interest').findOne({
        where: {
            user_id: user_id,
            interest_id: interest_id/*,
            status: 'Published'*/
        },
        attributes: ['user_id', 'interest_id', 'date', 'status']
    }).then((data) => {
        resolve(data)
    }).catch(reject)
})

exports.insert_interest = (db, data) => new Promise((resolve, reject) => {
    db.model('user_interest').create(data).then((data) => {
        resolve(data)
    }).catch(reject)
})

exports.get_security_question = (db, code) => new Promise((resolve, reject) => {
    db.model('master_security_question').findOne({
        where: {
            security_code: code
        },
        attributes: ['id', 'security_question']
    }).then((data) => {
        resolve(data)
    }).catch(reject)
})

exports.get_pending_forgot = (db, code) => new Promise((resolve, reject) => {
    db.model('temp_forgot_pass').findOne({
        where: {
            forgot_token: code,
            status: "Pending"
        },
        attributes: ['id', 'created_date']
    }).then((data) => {
        resolve(data)
    }).catch(reject)
})

exports.insert_forgot_pass = (db, data) => new Promise((resolve, reject) => {
    db.model('temp_forgot_pass').create(data).then((data) => {
        resolve(data)
    }).catch(reject)
})

exports.insert_deleted_account = (db, data) => new Promise((resolve, reject) => {
    db.model('temp_deleted_account').create(data).then((data) => {
        resolve(data)
    }).catch(reject)
})

exports.insert_forgot_id_data = (db, data) => new Promise((resolve, reject) => {
    db.model('temp_forgot_id').create(data).then((data) => {
        resolve(data)
    }).catch(reject)
})

exports.check_forgot_data = (db, frogot_token, encrypted_answer) => new Promise((resolve, reject) => {
    db.model('temp_forgot_id').findOne({
        where: {
            forgot_token: frogot_token,
            encrypted_answer: encrypted_answer

        },
        attributes: ['spice_id']
    }).then((data) => {
        resolve(data)
    }).catch(reject)
})

exports.check_city_id = (db, city, province) => new Promise((resolve, reject) => {
    let query = {
        where: {
            city_name: city
        },
        attributes: ['spice_id']
    }
    if(province) {
        query = {
            where: {
                city_name: city
            },
            include: [{
                model: db.model('master_state'),
                where: {
                    state_name: province
                },
                attributes: []
            }],
            attributes: ['id', 'city_name', 'state_id']
        }
    }
    db.model('master_city').findOne(query).then((data) => {
        resolve(data)
    }).catch(reject)
})

exports.check_brand_pref_reg_id = (db, brand_preference_id) => new Promise((resolve, reject) => {
    let query = {
        where: {
            brand_preference_id: brand_preference_id
        },
        include: [{
            model: db.model('master_brand'),
            attributes: ['brand_name', 'registration_cell_id']
        }],
        attributes: ['brand_preference_id', 'brand_preference_name']
    }
    db.model('brand_preferences').findOne(query).then((data) => {
        resolve(data)
    }).catch(reject)
})

// dhany code
exports.get_point_per_user = (db, user_id) => new Promise((resolve, reject) => {
    db.model('user').findOne({
        where: {
            id: user_id
        },
        attributes: ['point']
    }).then((data) => {
        resolve(data.point)
    }).catch(reject)
})

exports.update_point_user = (db, id, point) => new Promise((resolve, reject) => {
    db.model('user').update({
        point: point,
    },{
        where:{
            id:id
        }
    }).then((data)=>{
        resolve(data)
    }).catch(reject)
})

exports.insert_user_point_log = (db, user_id, action_id, point, type) => new Promise((resolve, reject) => {
    db.model('user_point_log').create({
        user_id : user_id,
        action_id: action_id,
        point: point,
        type: type
    }).then((data)=>{
        resolve(data)
    })
})

exports.check_user_point_log_exists = (db, user_id, action_id) => new Promise((resolve, reject) => {
    db.model('user_point_log').findOne({
        where: {
            user_id: user_id,
            action_id: action_id
        }
    }).then((data) => {
        resolve(data)
    }).catch(reject)
})

exports.get_user = (db, id) => new Promise((resolve, reject) => {
    db.model('user').findOne({
        where: {
            id: id
        }
    }).then((data) => {
        resolve(data)
    }).catch(reject)
})

let search_token = (db,token, ip, match_ip = false)=> new Promise((resolve, reject)=>{
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

exports.get_login_info = bluebird.coroutine(function *(db, token, ip, match_ip) {
    let cek = yield search_token(db, token, ip, match_ip)
    if(cek != null) {
        if(cek.token_profile.user_id == null) {
            return null
        }
        let data = yield get_data_user_by_id(db, cek.token_profile.user_id)
        data['token_id'] = cek.id
        return data
    }else{
        throw new MyError("Mismatch token",408)
    }
})
// cms dhany
exports.get_list_history_rewards = bluebird.coroutine(function *(db, req, id) {
    let data = yield req.lib('general').getDataPaging(
        db,
        '(SELECT user_voucher.id, offer.`name`, CASE WHEN user_voucher.`status` = "redeemed" or user_voucher.`status` = "pending" THEN "claimed" WHEN user_voucher.`status` = "available" THEN "redeemed" ELSE user_voucher.`status` END AS status_voucher,  CASE  WHEN user_voucher.`status` = "redeemed" or user_voucher.`status` = "pending" THEN user_voucher.updated_date WHEN user_voucher.`status` = "available" THEN user_voucher.created_date ELSE user_voucher.updated_date END AS date, offer.point  FROM user_voucher JOIN voucher ON voucher.id = user_voucher.voucher_id JOIN batch ON batch.id = voucher.batch_id JOIN offer ON offer.id = batch.offer_id where user_id = "'+id+'") as src',
        'id',
        ['id', 'name', 'status_voucher', 'date', 'point'],
        req.input.post
    )
    return data
})

exports.history_getpoint = bluebird.coroutine(function *(db, req, id) {
    let data = yield req.lib('general').getDataPaging(
        db,
        '(SELECT user_point_log.id as id, master_point.action as action, master_point.description as description, user_point_log.point as point, user_point_log.created_date as date FROM user_point_log JOIN master_point ON master_point.id = user_point_log.action_id WHERE user_point_log.user_id = "'+id+'" AND user_point_log.type = "get") as src',
        'id',
        ['id', 'action', 'description', 'point', 'date'],
        req.input.post
    )
    return data
})

//MAULFI : CMS Data
exports.get_datasource_user = bluebird.coroutine(function *(db, req) {
    let data = yield req.lib('general').getDataPaging(
        db,
        '(SELECT a.`id`, a.`fullname`, `gender`, a.`spice_id`, if(b.`city_name` IS NULL, "NOT SET", CONCAT(b.`city_name`,"/",c.`state_name`)) AS `city_province`, `valid_phone_number`, `valid_email`, `subscribe`, `registration_date`, `point`  FROM `user` a LEFT JOIN `master_city` b ON  a.`city_id` = b.`id` LEFT JOIN `master_state` c  ON b.`state_id` = c.`id`) as src',
        'id',
        ['id', 'fullname', 'spice_id', 'city_province', 'valid_email', 'valid_phone_number', 'point', 'gender', 'subscribe', 'registration_date'],
        req.input.post
    )
    return data
})

exports.get_datasource_user_detail = bluebird.coroutine(function *(db, req, id) {
    let data = yield req.lib('general').get_data_raw_query(
        db,
        'SELECT a.`id`, a.`fullname`, if(`gender` = "F", "Female", "Male") AS `gender`, a.`spice_id`, if(b.`city_name` IS NULL, "NOT SET", CONCAT(b.`city_name`,"/",c.`state_name`)) AS `city_province`, `valid_phone_number`, `valid_email`, `subscribe`, `registration_date`, `point`, e.`interest_name` , GROUP_CONCAT(e.`interest_name` SEPARATOR ",") AS `interest`, GROUP_CONCAT(e.`image_on` SEPARATOR ",") AS `img`, `birthdate`, `register_cell_id`, f.`program`, CONCAT(f.`program`,"/",f.`cell_name`) AS `register_from` FROM `user` a LEFT JOIN `master_city` b ON  a.`city_id` = b.`id` LEFT JOIN `master_state` c  ON b.`state_id` = c.`id` LEFT JOIN `user_interest` d ON a.`id` = d.`user_id` LEFT JOIN `interest_data` e ON d.`interest_id` = e.`id` LEFT JOIN  `cell` f ON a.`register_cell_id` = f.`cell_id` WHERE a.`id` = ' + id + ' GROUP BY a.`id`'
    )
    return data
})

exports.get_datasource_user_interest = bluebird.coroutine(function *(db, req, id, base_url) {
    let data = yield req.lib('general').get_data_raw_query(
        db,
        "SELECT CONCAT('" + base_url + "', e.`image_on`) AS `img`, `interest_name` AS `name` FROM `user_interest` d JOIN  `interest_data` e ON d.`interest_id` = e.`id` WHERE d.`user_id` = " + id + " AND e.status = 'Published' AND d.status = 'Published'"
    )
    return data
})

exports.get_city_by_id = (db, id) => new Promise((resolve, reject) => {
    let query = {
        where: {
            id: id
        },
        include: [{
            model: db.model('master_state')
        }],
        attributes: ['id', 'city_name', 'state_id']
    }
    db.model('master_city').findOne(query).then((data) => {
        resolve(data)
    }).catch(reject)
})

//old code
exports.get_detail = (db, id) => new Promise((resolve, reject) => {
    db.model('user').findOne({
        where: {
            id: id
        },
        include: [{
            model: db.model('user_profile'),
            attributes: ['id', 'fullname']
        }],
        attributes: ['id', 'username']
    }).then((data) => {
        resolve(data.point)
    }).catch(reject)
})

//merge data
exports.insert_merged_user = (db, data) => new Promise(
    (resolve, reject) => {
        db.model('user_merge_data').create(data).then((data) => {
            resolve(data.get('id'))
        }).catch(reject)
    }
)

exports.check_spice_id_merged = (db, spice_id) => new Promise((resolve, reject) => {
    let query = {
        include: [{
            model: db.model('user_merge_data'),
            where: {
                spice_id: spice_id
            },
            attributes: []
        }],
        // attributes: ['id', 'city_name', 'state_id']
    }
    db.model('user').findOne(query).then((data) => {
        resolve(data)
    }).catch(reject)
})

//insert & update brand_prference:
exports.insert_user_brand_pref = (db, data) => new Promise(
    (resolve, reject) => {
        db.model('user_brand_preference').create(data).then((data) => {
            resolve(data.get('id'))
        }).catch(reject)
    }
)

exports.update_user_brand_pref = (db, data, wheredata) => new Promise((resolve, reject) => {
    db.model('user_brand_preference').update(data, {
        where:wheredata
    }).then((data) => {
        resolve(data)
    }).catch(reject)
})

exports.check_brand_pref = (db, user_id, brand_pref_type) => new Promise((resolve, reject) => {
    db.model('user_brand_preference').findOne({
        where: {
            user_id: user_id,
            brand_pref_type: brand_pref_type
        }
    }).then((data) => {
        resolve(data)
    }).catch(reject)
})