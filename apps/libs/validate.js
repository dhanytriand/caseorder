exports.validate_array_int = (name,value) => new Promise((resolve, reject)=>{
    return bluebird.coroutine(function* () {
        if (typeof(value) != "object") {
            // return name + " must be array"
            resolve(name + " must be array")
        }

        for(let i in value){
            if(value[i].match(/^\d+$/) == null){
                // return name + " must be numeric"
                resolve(name + " must be numeric")
            }
        }
        resolve(true)
    })()
})

exports.validate_array_int_new = (name,value) => new Promise((resolve, reject)=>{
    return bluebird.coroutine(function* () {
        if (typeof(value) != "object") {
            // return name + " must be array"
            resolve(name + " must be array")
        }

        for(let i in value){
            if(typeof(value[i]) == "string"){
                if(value[i].match(/^\d+$/) == null){
                    // return name + " must be numeric"
                    resolve(name + " must be numeric")
                }
            }
            
        }
        resolve(true)
    })()
})