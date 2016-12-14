// var Notification = require('bootstrap-notify');

function notificationSuccess(title, message){
    $.notify({
            title: title,
            message: message
        }, {
            type: 'success',
            offset: 20,
            spacing: 10,
            z_index: 1031,
            delay: 5000,
            timer: 1000,
            placement: {
                from: "top",
                align: "right"
            },
            animate: {
                enter: 'animated zoomInDown',
                exit: 'animated zoomOutUp'
            }
        }
    );
}

function notificationAlert(title, message){
    $.notify({
        title: title,
        message: message
    }, {
        type: 'danger',
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 5000,
        timer: 1000,
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
