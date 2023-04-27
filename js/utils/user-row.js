export function createUserRow(user) {
    const row = $('<tr>');

    row.append($('<td>').html(`<img src="${user.avatar}">`));
    row.append($('<td>').text(user.name));
    row.append($('<td>').text(user.email));
    row.append($('<td>').text(user.phone));

    const button = $('<button>').addClass('btn btn-primary')
        .attr('data-toggle', 'modal')
        .attr('data-target', '#user-details')
        .text('Детальніше')
        .click(() => {
            $('#user-fullname').text(user.name);
            $('#user-avatar').attr('src', user.avatar);
            $('#user-email').text(`Email: ${user.email}`);
            $('#user-phone').text(`Номер телефона: ${user.phone}`);
            $('#user-address').text(`Адрес: ${user.address}`);
        });


    row.append($('<td>').append(button));

    return row;
}

export function preparePayload(user) {
    return {
        name: `${user.name.first} ${user.name.last}`,
        avatar: user.picture.large,
        email: user.email,
        phone: user.phone,
        address: `${user.location.street.name} ${user.location.street.number}, ${user.location.city}`,
    }
}