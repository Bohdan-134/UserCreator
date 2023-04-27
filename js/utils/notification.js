let notificationId;

export function noty({ message, type }) {
    const notification = $('#notification');
    notification.removeClass('alert-success alert-danger');

    clearTimeout(notificationId)

    if (type == 'success') {
        notification.addClass('alert-success');
    } else if (type == 'error') {
        notification.addClass('alert-danger');
    } else {
        return;
    }

    notification.text(message);

    notification.fadeIn();

    notificationId = setTimeout(() => {
        notification.fadeOut();
    }, 2000);
}