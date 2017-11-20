'use strict'

exports.config = {
    header_key: "order-token",
    base_url: "http://127.0.0.1:2007/",
    client_url: "http://127.0.0.1:3000",
    token_match_ip: false,
    allowed_no_header: ['/gettoken'],
    allowed_origin:['localhost','192.168.*','127.*','::1'],
    logged_page: []
}