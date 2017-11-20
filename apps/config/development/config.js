module.exports = {
    "version": '0.0.1',
    "header_key": "order-token",

    base_url: "",
    base_url_no_protocol: "",
    client_url: "http://127.0.0.1:3000",
    token_match_ip: false,
    allowed_no_header: ['/api/token/'],
    check_header: ['/api/'],
    allowed_origin:['localhost', '192.168.*', '127.*', '::1'],
    logged_page: [],
    max_timeout:300000, //in milliseconds
    max_post_size: '100mb',
    session_expired: 86400000, //in milliseconds
    session_secret: '0rd3r',
    session_name: 'order_session',
    csrf_protection : true,
    csrf_token_name : 'order_csrf',
    csrf_bypass: ['/token'],
    validate_admin: ['/cms/'],
    login_admin: '/cms/login/'
}