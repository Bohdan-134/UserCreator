$(document).ready(function() {
    const url = `https://randomuser.me/api/?results=5&nat=ua&seed=latest`;

    function showUserDetails(user) {
        $('#user-fullname').text(user.name);
        $('#user-avatar').attr('src', user.avatar);
        $('#user-email').text(`${user.email}`);
        $('#user-phone').text(`${user.phone}`);
        $('#user-address').text(`${user.address}`);
    }

    function createUserRow(user) {
        const row = $('<tr>');

        row.append($('<td>').html(`<img src="${user.avatar}">`));
        row.append($('<td>').text(user.name));
        row.append($('<td>').html(`<a href="mailto:${user.email}">${user.email}</a>`));
        row.append($('<td>').html(`<a href="tel:${user.phone}">${user.phone}</a>`));

        const button = $('<button>').addClass('btn btn-primary')
            .attr('data-toggle', 'modal')
            .attr('data-target', '#user-details')
            .text('Детальніше')
            .click(() => showUserDetails(user));


        row.append($('<td>').append(button));

        return row;
    }

    function preparePayload(user) {
        return {
            name: `${user.name.first} ${user.name.last}`,
            avatar: user.picture.large,
            email: user.email,
            phone: user.phone,
            address: `${user.location.street.name} ${user.location.street.number}, ${user.location.city}`,
        }
    }

    $.ajax({
        url,
        dataType: 'json',
        beforeSend: function() {
            $('#loader').addClass('loading');
        },
        complete: function() {
            $('#loader').removeClass('loading');
        },
        success: function(data) {
            const users = data.results.sort((a, b) => new Date(b.registered.date) - new Date(a.registered.date));

            $.each(users, function(_i, user) {
                const preparedUser = preparePayload(user);
                const row = createUserRow(preparedUser);

                $('#users-list tbody').append(row);
            });
        },
        error: function(error) {
            console.error(error);
        },
    });

    $('#create-user-form').on('submit', function(event) {
        const fieldsNames = ["avatar", "name", "surname", "email", "phone", "gender", "address"];

        event.preventDefault();

        const user = fieldsNames.reduce((acc, fieldName) => {
            const fieldValue = $(`#${fieldName}`).val()
            if (fieldValue) {
                return {...acc, [fieldName]: fieldValue }
            }
            return acc;
        }, {});

        user.avatar = $('#avatar-preview img').attr('src')
        console.log({ user });

        const row = createUserRow(user)

        $('#users-list tbody').prepend(row)

        $('#create-user-modal').modal('hide');
    });
});

function previewAvatar() {
    var file = document.querySelector('#avatar').files[0];
    var reader = new FileReader();

    reader.addEventListener('load', function() {
        $('#avatar-preview').html(`<img src="${reader.result}">`)
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}