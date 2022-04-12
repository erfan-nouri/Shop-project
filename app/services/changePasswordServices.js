const yup = require('yup')

/* password validatior with YUP */
exports.passwordValidate = async (data) => {

    const changePasswordSchema = yup.object().shape({
        password: yup.string().required('پسورد نمیتواند خالی باشد.').min(8, 'پسورد میبایست حداقل 8 کاراکتر باشد.').max(255, 'پسورد حداکثر میتواند 255 کاراکتر باشد.'),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null], 'رمز عبور یکسان نمیباشد.').required('تکرار پسورد نمیتواند خالی باشد.')
    })

    const result = await changePasswordSchema.validate(data).then(response => {
        return true;
    }).catch(err => {
        return err.errors
    })

    return result
}