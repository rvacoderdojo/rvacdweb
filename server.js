var Hapi = require ('hapi');

var server = Hapi.createServer('192.168.1.180', 9000);

server.route({
    method: 'GET',
    path: '/{path*}',
    handler : {
        directory: { path: './site', listing: true, index: true}
    }

});

server.start();