'use strict'

exports.order_product = (req, res, next) => {
    bluebird.coroutine(function*() {
        let param = [
            {
                name: 'user_id',
                rules: [
                    'required','numeric'
                ]
            },
            {
                name: 'product_id',
                rules: [
                    'required'
                ]
            },
            {
                name: 'quantity',
                rules: [
                    'required','numeric'
                ]
            }
        ]
        req.validate(req, param)
        let post_data = req.body
        let user_id = post_data.user_id
        let product_id = post_data.product_id
        let quantity = post_data.quantity

        let product_queries = req.queries('product')
        let orders_queries = req.queries('orders')
        let customer_queries = req.queries('customer')

        let get_product = yield product_queries.get_product(req.db, product_id)
        let subtotal = quantity * get_product.price
        let last_stock = get_product.stock - quantity
        let customer_data = yield customer_queries.get_customer_data(req.db, user_id)
        console.log("=====>",customer_data)
        if(customer_data == null){
            res.error('customer data not found')
        }
        else{
            if(get_product){
                if(get_product.stock < quantity){
                    res.error('stock not available')
                }else{
                    // check pending order
                    let check_pending_order = yield orders_queries.get_pending_order(req.db, user_id)
                    if(check_pending_order){
                        let orders_detail_exists = yield orders_queries.check_product(req.db, {
                            orders_id: check_pending_order.id,
                            product_id: product_id
                        })
                        if(orders_detail_exists){
                            let update_total = check_pending_order.total_price - orders_detail_exists.subtotal + subtotal
                            let update_orders_detail = yield orders_queries.update_orders_detail(req.db,orders_detail_exists.id,{
                                quota: quantity,
                                subtotal: subtotal
                            })
                            let update_orders = yield orders_queries.update_orders(req.db,check_pending_order.id,{
                                total_price: update_total
                            })
                        }else{
                            let insert_orders_detail = yield orders_queries.insert_orders_detail(req.db,{
                                orders_id: check_pending_order.id,
                                product_id: product_id,
                                quota: quantity,
                                subtotal: subtotal,
                                created_date: new Date(),
                                updated_date: new Date()
                            })
                            let total = check_pending_order.total_price + subtotal
                            let update_orders = yield orders_queries.update_orders(req.db,check_pending_order.id,{
                                total_price: total
                            })
                        }
                        
                    }else{
                        let insert_order = yield orders_queries.insert_orders(req.db,{
                            user_id: user_id,
                            total_price: subtotal,
                            status: 'pending'
                        })
                        let insert_orders_detail = yield orders_queries.insert_orders_detail(req.db,{
                            orders_id: insert_order.id,
                            product_id: product_id,
                            quota: quantity,
                            subtotal: subtotal,
                            created_date: new Date(),
                            updated_date: new Date()
                        })

                    }
                    
                    res.success('order created')
                }

                let update_stock = yield product_queries.update_product(req.db,product_id,{
                    stock: last_stock
                })

                res.success('order added')
            }else{
                res.error('product not found')
            }
        }

    })().catch(next)
}

exports.order_confirm = (req, res, next) => {
    bluebird.coroutine(function*() {
        let param = [
            {
                name: 'user_id',
                rules: [
                    'required','numeric'
                ]
            },
            {
                name: 'orders_id',
                rules: [
                    'required'
                ]
            },
            {
                name: 'account_number',
                rules: [
                    'required'
                ]
            }
        ]
        req.validate(req, param)

        let post_data = req.body

        let coupon_code = post_data.coupon_code
        let user_id = post_data.user_id
        let order_id = post_data.order_id
        let account_number = post_data.account_number

        let coupon_query = req.queries('coupon')
        let orders_query = req.queries('orders')

        let coupon_data = yield coupon_query.get_coupons(req.db, coupon_code)
        let orders_data = yield orders_query.get_orders_detail(req.db, user_id)
        if(orders_data == null){
            res.error("orders not found")
        }
        else{
            let total_price = orders_data.total_price
            if(coupon_data){
                if(coupon.percentage != 0){
                    let percentage = coupon.percentage / 100
                    percentage = total_price * percentage
                    total_price = total_price - percentage
                }
                else if(coupon.value != 0){
                    total_price = total_price - coupon.value
                }
                let update_coupon = yield coupon_query.update_coupon(req.db, coupon_data.id, {
                    
                })
            }
            let update_orders = yield orders_query.update_orders(req.db, order_id, {
                total_price: total_price,
                status: 'ordered',
                account_number: account_number,
                updated_date: new Date()
            })
            res.success('order has been confirmed')
        }

    })().catch(next)
}

exports.check_customer_data = (req, res, next) => {
    bluebird.coroutine(function*() {
        let param = [
            {
                name: 'user_id',
                rules: [
                    'required'
                ]
            }
        ]
        req.validate(req, param)
        let post_data = req.body
        let user_id = post_data.user_id
        let customer_query = req.queries('customer')

        let data_customer = yield customer_query.get_customer_data(req.db, user_id)
        if(data_customer){
            if(data_customer.address == null){
                res.error('address must be filled')
            }
            else if(data_customer.phone == null){
                res.error('phone number must be filled')
            }
            else{
                res.success('data customer completed')
            }
        }else{
            res.error('data customer not found')
        }

    })().catch(next)
}

exports.check_payment_proof = (req, res, next) => {
    bluebird.coroutine(function*() {
        let param = [
            {
                name: 'orders_id',
                rules: [
                    'required','numeric'
                ]
            },
            {
                name: 'bank',
                rules: [
                    'required'
                ]
            },
            {
                name: 'account_number',
                rules: [
                    'required','numeric'
                ]
            },
            {
                name: 'total_transfer',
                rules: [
                    'required'
                ]
            },
            {
                name: 'account_name',
                rules: [
                    'required'
                ]
            }
        ]
        req.validate(req, param)
        let post_data = req.body
        let order_id = post_data.orders_id
        let bank = post_data.bank
        let account_number = post_data.account_number
        let account_name = post_data.account_name
        let total_transfer = post_data.total_transfer

        let orders_query = req.queries('orders')
        let check_order = yield orders_query.check_ordered_order(req.db, order_id)
        console.log("====>",check_order)
        if(check_order){
            let insert_confirmation_order = yield orders_query.insert_order_payment(req.db, {
                orders_id: order_id,
                bank: bank,
                account_number: account_number,
                account_name: account_name,
                total_transfer: total_transfer,
                created_date: new Date()
            })
            res.success('confirmation added')
        }else{
            res.error('invalid order')
        }

    })().catch(next)
}

exports.check_status_order = (req, res, next) => {
    bluebird.coroutine(function*() {
        let param = [
            {
                name: 'user_id',
                rules: [
                    'required','numeric'
                ]
            }
        ]
        req.validate(req, param)

        let post_data = req.body
        let user_id = post_data.user_id
        let orders_query = req.queries('orders')

        let all_order = yield orders_query.get_all_order(req.db, user_id)
        let result = []
        let detail = []
        for( let i in all_order){
            result[i] = {
                order_id: all_order[i].id,
                status: all_order[i].status,
                total_price: all_order[i].total_price,
                orders_detail: all_order[i].orders_detail
            }
        }

        res.success(result)

    })().catch(next)
}