const helpers = {};
const bcrypt = require('bcryptjs');

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'No estas autorizado a entrar sin haber ingresado');
    res.redirect('/users/!ingresar')
};
helpers.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};


module.exports = helpers;