const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/Kanes_shop_two');
        console.log('successfully!')
    } catch (error) {
        console.log('thua')
    }
}

module.exports = {connect};