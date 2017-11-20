'use strict'

module.exports = {

    // model for token
    token: (model, db) => {
        model.hasOne(db.model('token_profile'), {foreignKey: 'token_id'})
        model.hasMany(db.model('token_log'), {foreignKey: 'token_id'})
    },
    token_fcm: (model, db) => {
        model.belongsTo(db.model('token'), {foreignKey: 'token_id'})
        model.belongsTo(db.model('token_profile'), {foreignKey: 'token_id'})
    },

    token_log: (model, db) => {
        model.belongsTo(db.model('token'), {foreignKey: 'token_id'});
    }
}