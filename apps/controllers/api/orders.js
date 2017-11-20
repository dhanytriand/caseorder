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

        let get_product = yield product_queries.get_product(req.db, product_id)
        let subtotal = quantity * get_product.price
        let last_stock = get_product.stock - quantity
        if(get_product){

            if(get_product.stock < quantity){
                res.error('stock not available')
            }else{
                // check pending order
                let check_pending_order = yield orders_queries.get_pending_order(req.db)
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

    })().catch(next)
}

exports.order_confirm = (req, res, next) => {
    bluebird.coroutine(function*() {
        
    })().catch(next)
}