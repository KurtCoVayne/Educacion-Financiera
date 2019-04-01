const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ATM_db', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(db =>console.log('DB is connected'))
    .catch(err =>console.error(err));