const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    count: { type: Number, default: 0 }, 
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    lastLoginDate: { type: Date } 
}, {
    collection: 'Userdata'
});

const User = mongoose.model('User', userSchema);

module.exports = User;
