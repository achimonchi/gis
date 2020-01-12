const
    app = require('./app'),
    http = require('http');

const _port = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(_port, (err) => {
    if (err) console.log(err)
    console.log(`Your server running at port ${_port}`)
})