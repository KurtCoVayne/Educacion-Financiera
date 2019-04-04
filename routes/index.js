var express = require('express');
var router = express.Router();
const {isAuthenticated} = require('../helpers/val')
const bcrypt = require('bcryptjs');
const Debt = require('../models/Debt');
const User = require('../models/User')
/* GET home page. */
router.get('/', function(req, res) {
  const user = req.user;
  res.render('index', {user});
});
router.get('/problematica', (req, res ) =>{
  res.render('problematica');
});
router.get('/solucion', (req, res) => {
  res.render('solucion');
});
router.get('/ejemplos', (req, res) => {
  res.render('solucion');
});
router.get('/conceptos', (req, res) => {
  res.render('conceptos');
});
router.get('/simulador',isAuthenticated ,(req, res) =>{
  res.render('u_services/make-credits')
});
router.post('/simulador', async (req, res) => {
  //  I = c * intereses * cuotas
  const errors = [];
  const { amount, dues, password, income } = req.body;
  if((income * dues)/2 < amount){
    errors.push({text: 'No es posible hacer tu prestamo, debido a que tus ingresos son muy bajos'})
    return res.render('u_services/make-credits', {errors})
  }
    

    if (await bcrypt.compare(password, req.user.password)) {
        let existingDebt = await Debt.findOne({ userId: req.user.id })
        if (existingDebt) {
            existingDebt = existingDebt.toJSON()
            if (existingDebt.amount === 0) {
                await Debt.findOneAndUpdate({ userId: req.user.id }, { amount, dues, payedAmount: 0 })
                await User.findByIdAndUpdate(req.user.id, { $set: { debt: amount } })
                req.flash('success_msg', 'Se creo una nueva deuda a tu nombre')
                return res.redirect('/pagar')
            } else {
                errors.push({ text: 'Ya tienes una deuda por: ' + (existingDebt.amount - existingDebt.payedAmount) + ' debes pagarla antes de solicitar otra' })
                return res.render('u_services/make-credits', { errors })
            }
        } else {
            await new Debt({
                userId: req.user.id,
                amount,
                dues
            }).save()
            await User.findByIdAndUpdate(req.user.id, { $set: { debt: amount, balance: req.user.balance + parseInt(amount) } })
            req.flash('success_msg', 'Se creo una nueva deuda a tu nombre')
            return res.redirect('/pagar')
        }
    } else {
        errors.push({ text: 'Contraseña incorrecta!' })
        return res.render('u_services/make-credits', { errors })
    }
});
router.get('/pagar', async (req, res)=> {
  const debt = await Debt.findOne({ userId: req.user.id })
  res.render('u_services/pay-credits', {debt})
});
router.post('/pagar', async (req, res) => {
  let { debtId, payValue, debtAmount, actualPayed, debtDues, debtDate } = req.body;
    payValue = parseFloat(payValue)
    debtAmount = parseFloat(debtAmount)
    actualPayed = parseFloat(actualPayed)
    const debt = await Debt.findById(debtId)
    const errors = [];
    if (!debt) {
        return res.redirect('/pagar')
    }
    if (req.user.balance <= payValue) {
        errors.push({ text: 'No tienes la suficiente cantidad de dinero para pagar, tienes: ' + req.user.balance })
        return res.render('u_services/pay-credits', { debt, errors })
    }
    await Debt.findByIdAndUpdate(debtId, { payedAmount: actualPayed + payValue })
    await User.findByIdAndUpdate(req.user.id, { $set: { debt: debtAmount - actualPayed - payValue, balance: req.user.balance - payValue } })
    debt.payedAmount += payValue
    if (actualPayed + payValue >= debtAmount) {
        req.flash('success_msg', 'Ya completaste tu deuda')
        await Debt.findByIdAndDelete(debtId)
        return res.redirect('/')
    }
    req.flash('success_msg', 'Se añadieron ' + payValue + '$ a tu deuda de ' + debtAmount)
    res.render('u_services/pay-credits', { debt })
})

module.exports = router;
