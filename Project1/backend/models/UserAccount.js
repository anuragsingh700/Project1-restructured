const mongoose = require('mongoose');

const { Schema } = mongoose;

// Represents a registered account (login credentials).
const UserAccountSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    }
});

// NOTE: model name kept as 'user_signup' so it keeps mapping to the
// existing 'user_signups' collection in MongoDB.
module.exports = mongoose.model('user_signup', UserAccountSchema);
