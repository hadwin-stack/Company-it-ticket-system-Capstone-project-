const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A ticket must have a summary title'] 
    },
    description: {
        type: String,
        required: [true, 'Please explain the computer problem']
    },
    status: {
        type: String,
        enum: ['Pending', 'Fixed'], 
        default: 'Pending'         
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Ticket', ticketSchema);