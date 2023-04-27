import { createUserRow, preparePayload } from './utils/user-row.js';

$(document).ready(function() {
    const url = `https://randomuser.me/api/?results=5&nat=ua&seed=latest`;

    $("#phone").inputmask();

    $.ajax({
        url,
        dataType: 'json',
        beforeSend: function() {
            $('.loading-table').addClass('active');
        },
        complete: function() {
            $('.loading-table').removeClass('active');
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
});

function previewAvatar() {
    var file = $('#avatar')[0].files[0];
    var reader = new FileReader();

    reader.addEventListener('load', function() {
        $('#avatar-preview').html(`<img src="${reader.result}">`);
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}