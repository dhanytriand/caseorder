'use strict'
exports.create_timestamp = function (date) {
    let date_new = new Date(parseInt(date.substr(6)))
    return date_new
}

exports.create_date_time = function (date) {
    let date_new = (new Date()).getTime()
    if(date != undefined) {
        date_new = (new Date (date)).getTime()
    }
    date_new += 7 * 60 * 60 * 1000
    let epoch_format = "/Date(" + date_new + "+0700)/"
    return epoch_format
}

exports.create_date_time_bulk = function (date) {
    let date_new = (new Date()).getTime()
    if(date != undefined) {
        date_new = (new Date (date)).getTime()
    }
    date_new -= 24 * 60 * 60 * 1000
    let epoch_format = "/Date(" + date_new + "+0700)/"
    return epoch_format
}

let format_date = function (date) {
    let month_name = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let day = date.getDate()
    let month_index = date.getMonth()
    let year = date.getFullYear()
    return day + ' ' + month_name[month_index] + ' ' + year
}

let format_ymd_his = function (date) {
    let dformat = ''
    let d = new Date(date)
    if(Object.prototype.toString.call(d) === "[object Date]") {
        if(isNaN(d.getTime())) {
            dformat = 'Not Set'
        }else{
            dformat = [
                d.getFullYear(),
                (d.getMonth() + 1).padLeft(),
                d.getDate().padLeft()
            ].join('-') + ' ' +
            [
                d.getHours().padLeft(),
                d.getMinutes().padLeft(),
                d.getSeconds().padLeft()
            ].join(':')
        }
    }else{
        dformat = 'Not Set'
    }
    return dformat
}

let format_date_time = function (date) {
    let month_name = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let day = date.getDate()
    let d = new Date(date)
    let month_index = date.getMonth()
    let year = date.getFullYear()
    return day.padLeft() + ' ' + month_name[month_index] + ' ' + year + ' ' +
    [
        d.getHours().padLeft(),
        d.getMinutes().padLeft(),
        d.getSeconds().padLeft()
    ].join(':')
}

Number.prototype.padLeft = function (base, chr) {
    let len = (String(base || 10).length - String(this).length) + 1;
    return len > 0 ? new Array(len).join(chr || '0') + this : this;
}

let format_ymdhis = function (date) {
    let d = new Date(date)
    let dformat = [
        d.getFullYear(),
        (d.getMonth() + 1).padLeft(),
        d.getDate().padLeft()
    ].join('') +
    [
        d.getHours().padLeft(),
        d.getMinutes().padLeft(),
        d.getSeconds().padLeft()
    ].join('')
    return dformat
}

let format_ymdhi = function (date) {
    let d = new Date(date)
    let dformat = [
        d.getFullYear(),
        (d.getMonth() + 1).padLeft(),
        d.getDate().padLeft()
    ].join('') +
    [
        d.getHours().padLeft(),
        d.getMinutes().padLeft()/* ,
        d.getSeconds().padLeft() */
    ].join('')
    return dformat
}

let format_ymd = function (date) {
    let dformat = ''
    let d = new Date(date)
    if(Object.prototype.toString.call(d) === "[object Date]") {
        if(isNaN(d.getTime())) {
            dformat = '00000000'
        }else{
            dformat = [
                d.getFullYear(),
                (d.getMonth() + 1).padLeft(),
                d.getDate().padLeft()
            ].join('')
        }
    }else{
        dformat = '00000000'
    }
    return dformat
}
let format_ymd_start = function (date) {
    let d = new Date(date)
    let dformat = [
        d.getFullYear(),
        (d.getMonth() + 1).padLeft(),
        d.getDate().padLeft()
    ].join('-') + " 00:00:00"
    return dformat
}
let format_ymd_custom = function (date, custom) {
    let d = new Date(date)
    let dformat = [
        d.getFullYear(),
        (d.getMonth() + 1).padLeft(),
        d.getDate().padLeft()
    ].join('-') + " " + custom
    return dformat
}
let format_ymd_end = function (date) {
    let d = new Date(date)
    let dformat = [
        d.getFullYear(),
        (d.getMonth() + 1).padLeft(),
        d.getDate().padLeft()
    ].join('-') + " 23:59:59"
    return dformat
}

let format_ymd_dash = function (date) {
    let dformat = ''
    let d = new Date(date)
    if(Object.prototype.toString.call(d) === "[object Date]") {
        if(isNaN(d.getTime())) {
            dformat = 'Not Set'
        }else{
            dformat = [
                d.getFullYear(),
                (d.getMonth() + 1).padLeft(),
                d.getDate().padLeft()
            ].join('-')
        }
    }else{
        dformat = 'Not Set'
    }
    return dformat
}

let get_date = (date, days_before, state = 'start') => {
    if(Object.prototype.toString.call(date) === "[object Date]") {
        if(isNaN(date.getTime())) {
            date = new Date()
            date = date.setDate(date.getDate() - days_before)
            if(state == 'start') {
                date = format_ymd_start(date)
            }else{
                date = format_ymd_end(date)
            }
        }else {
            date = date.setDate(date.getDate())
            if(state == 'start') {
                date = format_ymd_start(date)
            }else{
                date = format_ymd_end(date)
            }
        }
    }else {
        date = new Date()
        date = date.setDate(date.getDate() - days_before)
        if(state == 'start') {
            date = format_ymd_start(date)
        }else{
            date = format_ymd_end(date)
        }
    }
    return date
}

let get_age = (date) => { // birthday is a date
    let birthday = new Date(date)
    let ageDifMs = Date.now() - birthday.getTime()
    let ageDate = new Date(ageDifMs) // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970)
}

let diff_date = (start, end) => {
    let date1 = new Date()
    if(start != '') {
        date1 = new Date(start)
    }
    let date2 = new Date()
    if(end != '') {
        date2 = new Date(end)
    }
    let timeDiff = /* Math.abs( */date2.getTime() - date1.getTime()/* ) */
    let diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
    let difhour = Math.ceil(timeDiff / (1000 * 60 * 60))
    let difmin = Math.ceil(timeDiff / (1000 * 60))
    let e_diffdate = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    if(difmin < 45) {
        difhour = 0
    }
    return {date:diffDays, hour:difhour, minute:difmin, e_diffdate:e_diffdate, timeDiff:timeDiff, startdate:date1, enddate:date2}
}

exports.format_date = format_date
exports.format_ymd_his = format_ymd_his
exports.format_date_time = format_date_time
exports.format_ymdhis = format_ymdhis
exports.format_ymd_start = format_ymd_start
exports.format_ymd_end = format_ymd_end
exports.format_ymd = format_ymd
exports.format_ymdhi = format_ymdhi
exports.format_ymd_dash = format_ymd_dash
exports.get_date = get_date
exports.get_age = get_age
exports.diff_date = diff_date
exports.format_ymd_custom = format_ymd_custom