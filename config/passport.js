const passport = require('passport');
const LocalStrategy = require('passport-local')

const User = require('../models/User')

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) =>{
    const user = await User.findOne({email: email})
    if(!user){
        return done(null, false, {message: 'No se encontró un usuario con ese correo'})
    } else {
        const match = await user.matchPassword(password);
        if(match){
            return done(null, user)
        } else{
            return done(null, false, {message: 'La contraseña es incorrecta'})
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) =>{
        done(err, user);
    });
});