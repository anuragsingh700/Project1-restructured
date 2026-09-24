const mongoose = require('mongoose');

const { Schema } = mongoose;

// Represents a banquet hall listing created by an admin user.
const BanquetSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Banquet: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    Details: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    imagePreviewUrl: {
        type: String,
        required: true
    },
});

// NOTE: model name kept as 'user' so it keeps mapping to the existing
// 'users' collection in MongoDB (mongoose auto-pluralizes model names).
module.exports = mongoose.model('user', BanquetSchema);
