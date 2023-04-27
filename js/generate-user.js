import { createUserRow, preparePayload } from './utils/user-row.js';
import { noty } from './utils/notification.js';

$(document).ready(function () {
    $('#generate-user-form').on('submit', function (event) {
        event.preventDefault();

        const gender = $('#generate-user-form #gender option:selected').val();

        const success = (data) => {
            const user = data.results[0];
            const preparedUser = preparePayload(user);
            const row = createUserRow(preparedUser);
            
            noty({ message: "Успешно сгенерирован пользователь!", type: "success" })

            $('#users-list tbody').prepend(row)

            $('#generate-user-modal').modal('hide');

            $(this).trigger('reset');
        }

        $.ajax({
            url: `https://randomuser.me/api/?nat=ua&gender=${gender}`,
            dataType: 'json',
            beforeSend: function () {
                $('.loading-table').addClass('active');
            },
            complete: function () {
                $('.loading-table').removeClass('active');
            },
            success,
            error: function (error) {
                console.error(error);
            },
        });
    });
});