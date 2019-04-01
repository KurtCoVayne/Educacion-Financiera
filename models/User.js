const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 1000 },
    date: { type: Date, default: Date.now },
    find: { type: Boolean, default: true },
    debt: { type: Number, default: 0 }//,
    // services: {type:[String]}
});
// DEBT y SERVICES SON PROPIEDADES PARA SERVICIOS DEL WALLET
UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
module.exports = mongoose.model('User', UserSchema)