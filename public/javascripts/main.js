// var port = window.location.port;
// var socket = io(`//${window.location.hostname}:${port}`);
// const socket = io('ws://localhost:3000');
var socket = io();

socket
	.on('canary', function (data) {
		$('.running_for').html('Server running for:<br>' + secondsToDhms(data.duration));
	})
	.on('error', function (data) {
		console.log('socket event state: error');
		console.log(data);
	})
	.on('connection', function (data) {
		console.log('socket event state: connection');
		console.log(data);
	})
	.on('disconnect', function (data) {
		console.log('socket event state: disconnect');
		console.log(data);
	})
	.on('connect', function (data) {
		console.log('socket event state: connect');
		console.log(data);
	})
	.on('reconnect', function (data) {
		console.log('socket event state: reconnect');
		console.log(data);
	})
	.on('connect_failed', function (data) {
		console.log('socket event state: connect_failed');
		console.log(data);
	})
	.on('connect_error', function (data) {
		console.log('socket event state: connect_error');
		console.log(data);
	})
	.on('connect_timeout', function (data) {
		console.log('socket event state: connect_timeout');
		console.log(data);
	})
	;