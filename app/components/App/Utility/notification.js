var Notification = require('bootstrap-notify');

function notificationSuccess(title, message){
    $.notify({
            title: title,
            message: message
        }, {
            type: 'success'
        }
    );
}

function notificationAlert(title, message){
    $.notify({
        title: title,
        message: message
    }, {
        type: 'danger',
        placement: {
            from: "top",
            align: "right"
        },
        animate: {
            enter: 'animated zoomInDown',
            exit: 'animated zoomOutUp'
        }
    });
}

export {notificationAlert, notificationSuccess};