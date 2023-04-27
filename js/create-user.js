import { validateForm } from './utils/validation.js';
import { createUserRow } from './utils/user-row.js';
import { noty } from './utils/notification.js';

$(document).ready(function () {
    $('#create-user-form').on('submit', function (event) {
        event.preventDefault();

        const fieldsNames = ["avatar", "name", "surname", "email", "phone", "gender", "address"];

        const userFields = (() => {
            const fields = fieldsNames.reduce((acc, fieldName) => {
                const fieldValue = $(`#create-user-form #${fieldName}`).val()
                if (fieldValue) {
                    return { ...acc, [fieldName]: fieldValue }
                }

                return acc;
            }, {});

            fields.avatar = fields.avatar ? $('#avatar-preview img').attr('src') : './icons/default-user.jpg';

            return fields;
        })()

        const errors = validateForm(userFields);

        if (errors.length) {
            errors.forEach(({ error, field }) => {
                $(`#create-user-form #${field}`).addClass('has-error');
                const errorDiv = $('<div>').text(error).addClass('error-text');
                $(`#create-user-form #field-${field}`).append(errorDiv);

                $(`#create-user-form #${field}`).off("focus");
                $(`#create-user-form #${field}`).focus(function () {
                    $(this).removeClass('has-error');
                    errorDiv.remove()
                })
            })
            return;
        }

        const userRow = createUserRow(userFields)

        $('#users-list tbody').prepend(userRow)

        noty({ message: "Успешно создан пользователь!", type: "success" })

        $('#create-user-modal').modal('hide');

        $(this).trigger('reset');

        $('#avatar-preview').html(`<img src="./icons/add.svg" alt="plus">`);
    });
})