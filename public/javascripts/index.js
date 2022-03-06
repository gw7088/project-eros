/**
 * Event handelers that call certain methods when certain assets
 * are clicked or certain events are complete
 */
function initHandlers(){

    socket
        .on('user registered',userRegistered)
    ;

    $('.submit').click(onSubmitClicked);
}


/**
 * Logic depending on action of registering user
 */
function userRegistered(data){
    // console.log('user registered');
    // console.log(data);

    if(data.success){
        return showToastAlert('Successfully Registered');
    }
    else{
        var msg = data.message
        return showToastError(msg);
    }
}


/**
 * Logic what to do once submit is clicked
 */
function onSubmitClicked(){
    // -----> Fill data with user information
    var data = {
        email:$('.emailField').val(),
        phone:$('.phoneField').val(),
        valid:false
    }
    $('.form-enter .agreeCheckbox').each( function(){
        var isChecked = $(this).prop('checked');
        var parameter = $(this).attr('data-parameter');
        // console.log('isChecked');
        // console.log(isChecked);
        // console.log('parameter');
        // console.log(parameter);
        if(!parameter) return; // Throw error
        data[parameter] = isChecked;
    });


    // -----> Check for Valid Email...
    if(!validateEmail(data.email)) return showToastError('Invalid Email');
    // -----> Check for Valid Phone
    // if(data.phone == '') return showToastError('Invalid Phone');
    // -----> Check for Checked checkbox
    if(!data.valid) return showToastError('Answer : Are you 18+ ?');

    // console.log(data);
    socket.emit('register user',data);
}

/**
 * Validates email with regex
 * @param {*} input 
 */
function validateEmail(input) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(input.match(validRegex)) 
        return true;
    else
        return false;
  }


/**
 * All the page requirements that need to be loaded from the start
 */
function init(){
    initHandlers();
}

/**
 * Setup everything on page loaded
 */
$(document).ready(function(){
     init();
});