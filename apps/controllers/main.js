'use strict';

exports.index = (req, res, next) => {
    res.render('index', {
            title: 'Hello world',
            user: ''
        }
    );
}


exports.examplePaging = (req, res, next) => {
}