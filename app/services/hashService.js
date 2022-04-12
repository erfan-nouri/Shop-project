const bcrypt = require('bcrypt')

/* hash password with bcrypt*/ 
exports.hashPassword = async (plainPassword) => {

    return bcrypt.hash(plainPassword, 10)

}

/* compaire plain password with hashed password*/ 
exports.comparePassword =async (plainPassword, hashedPassword) => {

    return bcrypt.compare(plainPassword, hashedPassword)

}