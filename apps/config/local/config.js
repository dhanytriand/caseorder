'use strict'

module.exports = {
    "version": "0.0.1",
    "header_key": "order-token",
    
    base_url: "http://127.0.0.1:2007/",
    client_url: "http://127.0.0.1:3000",
    token_match_ip: false,
    allowed_no_header: ['/api/token/'],
    check_header: ['/api/'],
    allowed_origin:['localhost','192.168.*','127.*','::1'],
    logged_page: [],
    static_files: ['uploads','assets'],
    static_paths: ['/images','/assets'],
    max_timeout: 300000, //in milliseconds
    max_post_size: '100mb',
    session_expired: 86400000, //in milliseconds
    session_secret: '0rd3rs',
    session_name: 'orders_session',
    csrf_protection : true,
    csrf_token_name : 'orders_csrf',
    csrf_bypass: ['/token'],
    max_csrf: 10,
    // validate_admin: ['/cms'],
    // login_admin: '/cms/login/'
}