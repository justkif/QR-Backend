const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Database Connected.');
    } catch (err) {
        console.error(err);
    }
}