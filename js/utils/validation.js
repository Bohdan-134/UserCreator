const validationRegex = {
    "phone": { regexp: /^\+?\d{1,3}(\s*[-()\s]?\d){5,12}$/, error: "Неправильно введенный телефон" },
    "email": { regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, error: "Неправильно введенная почта" }
};

export function validateForm(data) {
    return Object.entries(data).reduce((acc, [field, value]) => {
        if (value?.length && validationRegex[field] && !(validationRegex[field].regexp).test(value)) {
            return [...acc, { field, error: validationRegex[field].error }];
        }
        return acc
    }, [])
}
