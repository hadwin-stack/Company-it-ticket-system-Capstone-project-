const Ticket = require('../models/Ticket');

exports.createTicket = async (req, res) => {
    try {
        const { title, description } = req.body;
        
        const newTicket = new Ticket({ title, description });
        await newTicket.save();
        
        res.status(201).json(newTicket); 
    } catch (error) {
        res.status(400).json({ message: "Failed to create ticket", error: error.message });
    }
};

exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find().sort({ createdAt: -1 }); 
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: "Server error while fetching tickets", error: error.message });
    }
};

exports.fixTicket = async (req, res) => {
    try {
        const { id } = req.params; 
        
        const updatedTicket = await Ticket.findByIdAndUpdate(
            id, 
            { status: 'Fixed' }, 
            { new: true } 
        );
        
        if (!updatedTicket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        
        res.status(200).json(updatedTicket); 
    } catch (error) {
        res.status(500).json({ message: "Failed to update ticket", error: error.message });
    }
};

