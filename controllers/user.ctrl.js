    
const User = require('../models/User')
const userCtrl = {};
const bcrypt = require('bcryptjs');
const { encryptPassword } = require('../helpers/val')

userCtrl.signup = async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if (name.length <= 0 || password.length <= 0 || confirm_password.length <= 0 || email.length <= 0) {
        errors.push({ text: 'Yo creo que te falto alguno de los campos amigo' })
    } else if (password != confirm_password) {
        errors.push({ text: 'Las contraseñas no coinciden' });
    } else if (password.length <= 4) {
        errors.push({ text: 'Deberías usar una contraseña más larga' })
        errors.splice(1, 1);
    } else {
        await User.findOne({ $or: [{ email: email }, { name: name }] }, { name: 1, email: 1 })
            .then(existUser => {
                if (existUser) {
                    if (existUser.email === email) {
                        errors.push({ text: 'Alguien ya uso ese e-mail' })
                    } else if (existUser.name === name) {
                        errors.push({ text: 'Alguien ya uso ese nombre' })
                    }
                }
            }).catch(err => console.error(err))
    } if (errors.length > 0) {
        res.render('users/registrar', { errors, name, email, password });
    } else {
        const newUser = new User({ name, email, password, confirm_password });
        newUser.password = await newUser.encryptPassword(password)
        await newUser.save()
        req.flash('success_msg', 'Estas registrado. Bienvenido a la aplicación de Educación Financiera')
        res.redirect('/users/ingresar')
    }
}
module.exports = userCtrl