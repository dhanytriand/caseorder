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
    },

    orders: (model, db) => {
        model.hasMany(db.model('orders_detail'), {foreignKey: 'orders_id'})
        model.hasMany(db.model('orders_payment'), {foreignKey: 'orders_id'})
        model.hasMany(db.model('orders_shipment'), {foreignKey: 'orders_id'})
        model.hasOne(db.model('coupon'), {foreignKey: 'coupon_id'})
        model.hasOne(db.model('customer'), {foreignKey: 'user_id'})
    },

    orders_detail: (model, db) => {
        model.belongsTo(db.model('orders'), {foreignKey: 'orders_id'})
        model.belongsTo(db.model('product'), {foreignKey: 'product_id'})
    },

    orders_payment: (model, db) => {
        model.belongsTo(db.model('orders'), {foreignKey: 'orders_id'})
    },

    orders_shipment: (model, db) => {
        model.belongsTo(db.model('orders'), {foreignKey: 'orders_id'})
    },

    coupon: (model, db) => {
        model.belongsTo(db.model('orders'), {foreignKey: 'coupon_id'})
    },

    customer: (model, db) => {
        model.belongsTo(db.model('orders'), {foreignKey: 'user_id'})
    },

    product: (model, db) => {
        model.hasMany(db.model('orders_detail'), {foreignKey: 'product_id'})
    }
}