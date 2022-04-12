const yup = require('yup')

exports.validator = async (registerData) => {

    const registerSchema = yup.object().shape({
        firstname: yup.string().required('.نام نمیتواند خالی باشد').max(100,'نام بیش از حد مجاز طولانی است'),
        lastname: yup.string().required('نام خانوادگی نمیتواند خالی باشد.').max(100,'نام خانوادگی بیش از حد مجاز طولانی است.'),
        email: yup.string().email('ایمیل به درستی وارد نشده است.'),
        password: yup.string().min(8,'رمز عبور میبایست حداقل 8 کاراکتر باشد').max(255,'رمز عبور حداکثر میتواند 255 کاراکتر باشد.').required('رمز عبور نمیتواند خالی باشد.'),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null],'رمز عبور یکسانی وارد نشده است').required('تکرار کلمه عبور الزامی است.')
    })

    const validateResult = await registerSchema.validate(registerData)
        .then(response => {
            return true;
        })
        .catch(err => {
            return err.errors;
        })

    return validateResult;
}