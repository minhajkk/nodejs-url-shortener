var express = require('express')
    ,   app = express()
    ,   server = require('http').createServer(app)
    ,   io = require('socket.io').listen(server)
    ,   emitter = require('./util/socket-util.js')(io)
    ,   path = require('path')
    ,   logger = require('morgan')
    ,   cookieParser = require('cookie-parser')
    ,   bodyParser = require('body-parser')
    ,   credentials = require('./credentials.js')
    ,   mongoose = require('mongoose');

//setup db
var options = {
    server: {
        socketOptions: { keepAlive: 1 }
    }
};
mongoose.connect(credentials.mongo.connectionString, options);

app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')());

// set up handlebars view engine
var handlebars = require('express-handlebars').
    create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// setup flash message
app.use(function(req, res, next){
// if there's a flash message, transfer
// it to the context, then clear it
    res.locals.flash = req.session.flash;
    delete req.session.flash;
    next();
});

// All the routes goes in this file.
require('./routes/index')(app, io, credentials.server);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var runningPortNumber = process.env.PORT || 3000;

server.listen(runningPortNumber, function () {
    var port = server.address().port;
    console.log('transporter app listening at  port %s', runningPortNumber);
});

