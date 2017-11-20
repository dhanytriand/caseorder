'use strict'
let randomstring = require("randomstring")
let crypto = require('crypto')

exports.encrypt_data = function (data) {
    // console.log(data)
    let enc_data = crypto.createHash('md5').update(data).digest("Base64")
    enc_data = new Buffer(enc_data, 'Base64').toString('hex')
    return enc_data
}
// require('make-runnable')

let encrypt_password_cms = (pwd, salt = '')=>{
    if(salt == '')
        salt = randomstring.generate({
            length: 6,
            charset: 'alphanumeric'
        })
    return '$' + salt + '$.' + crypto.createHash('sha256').update(salt+pwd).digest('base64')
}

exports.encrypt_password_cms = ( pwd )=> {
    return encrypt_password_cms(pwd)
};

exports.check_password_cms = function(encpwd ,pwd ){
    encpwd = encpwd.toString()
    let salt = encpwd.substr(1,6)
    return (encrypt_password_cms(pwd, salt) === encpwd)
}