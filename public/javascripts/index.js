// Setup everythin on page loaded
$(document).ready(function(){
    console.log('HELOO THERE');
    console.log('Testing Socket.io:');
    test();

    socket
        .on('tested socketio',onTestRecieved)
        ;
});

function test(){
    var data = {
        thing1:1,
        thing2:2
    };
    socket.emit('test socketio',data);
}

function onTestRecieved(data){
    console.log('Test Recieved:');
    console.log(data);
}