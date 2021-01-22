var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var request = require("request");
var app = express();

const
  admin = new (require('./bin/admin'))
  port = 3000;
  ;

// Socket.io server
var httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer);

// Socket handlers
io.on('connection',function(socket){
	initUserConnection(socket);
	userConnected(socket);
});
// var server = require('http').Server(app);	// TODO: configure http server to redirect to https
// var httpServer = require('http').createServer(app);
// var serverHTTPS = require('https').createServer(httpsCredentials,app);
// var serverHTTPS = require('https').createServer(app);
// var io = require('socket.io')(serverHTTPS, {
// 	// pingInterval: 30000, // <-- Default ping interval - how many ms before sending a new ping packet
// 	// pingTimeout: 5000, // <-- Default ping interval - how many ms without a pong packet to consider the connection closed
// 	pingInterval: 30000, // <-- RESOLUTION ping interval - how many ms before sending a new ping packet
// 	pingTimeout: 10000, // <-- RESOLUTION ping interval - how many ms without a pong packet to consider the connection closed
// });
// var io = require('socket.io')(app);
// var io = require('socket.io').listen(server);
// const io = require('socket.io')(httpServer);


// Routes
const
  indexRouter = require('./routes/index'),
  userRouter = require('./routes/user')
  ;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Hooking it up
app.use('/', indexRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {
	app,
	httpServer: httpServer,
  	// serverHTTPS: serverHTTPS,
	io: io
};

function userConnected(socket){
	// Get a token and assign it to the user, before we do anything else
	admin.getToken(function(token){
		// console.log(socket);
		setSocketData(socket,'uid',token);
		// console.log(socket);
	});
}

let userDataLoc = ['_uniqueData'];
function setSocketData(socket,key,val){
	if(!socket) return 'err: No socket defined';
	if(!socket[userDataLoc]) socket[userDataLoc] = [];
	socket[userDataLoc].key = val;
	return socket[userDataLoc].key;
}

// Handle requests from Socket.io
function initUserConnection(socket){
	socket
		.on('error',function(data){
			// let userdata = socket ? admin.getUserDataFromSocket(socket) : {};
			// let userid = userdata && userdata.id ? userdata.id : 0;
			// admin.log({
			// 	userid: userid,
			// 	type: 'socket error',
			// 	log: JSON.stringify({
			// 		data: data,
			// 		userdata: userdata
			// 	}),
			// 	isLive: isLive,
			// 	socket: socket,
			// });
		})
		.on('test socketio',function(data){
			admin.lets_test_socketIO(data,response =>{
				socket.emit('tested socketio',response);
			});
        })
        .on('get user information',function(data){
			admin.get_user_information(data,response =>{
				socket.emit('got user information',response);
			});
		})
	  ;
}