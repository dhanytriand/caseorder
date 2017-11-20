'use stricts'
module.exports = (name, date) => {
    date = date = new Date(date)
    if(Object.prototype.toString.call(date) === "[object Date]") {
        if(isNaN(date.getTime())) {
            return "invalid " + name
        }
    }else {
        return "invalid " + name
    }
    return ""
}