'use strict'
const fs = require('fs') //Load the filesystem module
const read_chunk = require('read-chunk')
const file_type = require('file-type')

function decode_base64_image (data_string) {
    let matches = data_string.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
    let response = {}

    if (matches.length !== 3) {
        return new Error('Invalid input string')
    }

    response.type = matches[1]
    response.data = new Buffer(matches[2], 'base64')
    return response
}

let image_upload = (base64raw, naming = "avatar/avatar_", whitelist_filetype = []) => new Promise((resolve, reject) => {
    if(whitelist_filetype[0] === undefined) {
        whitelist_filetype = ['jpg', 'jpeg', 'png']
    }
    let image_type_regular_expression = /\/(.*?)$/
    let base64_data = decode_base64_image(base64raw)
    let image_type_detected = base64_data.type.match(image_type_regular_expression)
    let image_type_file = image_type_detected[1].toLowerCase()
    if (whitelist_filetype.indexOf(image_type_file) > -1) {
        let folder = "./uploads/images/"
        let img_name = (new Date()).getTime() + "." + image_type_file
        let image_name = naming + img_name
        let full_path = folder + image_name
        let avatar_name = image_name.split("/")
        fs.writeFile(full_path, base64_data.data, 'base64', function (err) {
            const buffer = read_chunk.sync(full_path, 0, 4100)
            let types = file_type(buffer)
            if(err) {
                reject(err)
            }
            let response = {
                code:0,
                img_name:avatar_name[1],
                file_name:image_name,
                full_path:full_path
            }
            if(types !== null) {
                console.log(types.ext)
                if (whitelist_filetype.indexOf(types.ext) > -1) {
                    response.code = 0
                }else{
                    response.code = 1
                    fs.unlinkSync(full_path)
                }
            }else {
                response.code = 1
                fs.unlinkSync(full_path)
            }
            resolve(response)
        })
    } else {
        throw new Error("Invalid Image Type!")
    }
})

module.exports.upload = image_upload