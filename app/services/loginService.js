const userModel = require('../models/users.js');
const yup = require('yup')
const hashService = require('./hashService.js')



exports.checkUser = async (userEmail, userPassword) => {

    const result = await userModel.checkUser(userEmail)
    const comparePassword = await hashService.comparePassword(userPassword,result.password)

    if (userEmail == result.email && comparePassword==true) {
        return {
            error: false,
            user: result
        }
    } else {
        return { error: true }
    }
}
exports.validator = async (loginData) => {

    const loginSchema = yup.string().email('ایمیل به درستی وارد نشده است.');

    const validateResult = await loginSchema.validate(loginData)
        .then(response => {
            return true;
        })
        .catch(err => {
            return err.errors;
        })

    return validateResult;
}