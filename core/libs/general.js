'use strict'

var crypto = require('crypto')

function return_empty()
{
    return {
        draw : 0,
        recordsTotal : 0,
        recordsFiltered : 0,
        data : []
    }
}

function randomString() {
    let rand_string =  Math.random().toString(36).substr(2, 6)

    return rand_string
}

let query = bluebird.coroutine(function*(db, q) {
    let data = yield db.getConnection().query(q, { type: Sequelize.QueryTypes.SELECT})
    return data
});

exports.getDataPaging = bluebird.coroutine(function* (db, queryFrom, uniqueId, columns, posts) {

    posts = Object.assign({
        length: 10,
        start: 0,
        sorting: '',
        filtering: '',
        order:'',
        search:''
    }, posts);
    console.log(posts)
    posts.filtering = posts['search']
    let length = parseInt(posts['length']) || 10
    let start = parseInt(posts['start']) || 0

    if(columns.length == 0 || uniqueId == undefined || uniqueId == '' || queryFrom == undefined || queryFrom == '') {
        return resolve(return_empty())
    }
    //for mysql
    let limit = 'LIMIT ' + start + ',' + length
    let order = ''

    if(posts.sorting != '') {
        posts.sorting = JSON.parse(posts.sorting)
    }else{
        posts.sorting = []
    }

    let oder_obj = posts['order']
    if(typeof posts['order'] !== undefined && posts['order'].length > 0) {
        for(let o in oder_obj) {
            order += columns[parseInt(oder_obj[o]['column'])] + " " + oder_obj[o]['dir'] + ", "
        }
        order += "DELETETHIS"
        order = order.replace(', DELETETHIS', '')
        order = 'ORDER BY ' + order
    }

    let where = ""

    if(typeof posts['search'] !== undefined && posts['search'] != "") {
        where = "WHERE (";
        for(let i in columns) {
            where += columns[i] + " LIKE '%" + posts['search']['value'] + "%' OR "
        }
        where += "DELETETHIS"
        where = where.replace('OR DELETETHIS', '')
        where += ")"
    }

    let q = "SELECT SQL_CALC_FOUND_ROWS " + columns.join(',') + " FROM " + queryFrom + " " + where + " " + order + " " + limit

    // let datares = [];
    let datares = yield query(db, q)
    /* Data set length after filtering */

    let queryFiltered = "SELECT count(*) as count FROM " + queryFrom + " " + where
    console.log(queryFiltered)
    let result = yield query(db, queryFiltered)
    let numFiltered = result[0].count

    /* Total data set length */
    let queryTotal = "SELECT COUNT(" + uniqueId + ") as count FROM " + queryFrom

    result = yield query(db, queryTotal)
    let numDatas = result[0].count

    /*
    * Output
    */
    return {
        draw : 0,
        recordsTotal : numDatas,
        recordsFiltered : numFiltered,
        data : datares
    }
})

exports.get_data_raw_query = bluebird.coroutine(function* (db, query_from) {
    let result = yield query(db, query_from)
    /*
    * Output
    */
    return result
})