const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registration 
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "Email already registered" });

        // Encrypt the password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save account securely to MongoDB Atlas
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
};

// Authentication 
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verify user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email credentials" });

        // Compare input password with encrypted database password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid password credentials" });

        // Generate a JSON Web Token (JWT)
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'fallback_capstone_secret',
            { expiresIn: '1d' }
        );

        // Send token and basic info back to frontend
        res.status(200).json({
            token,
            user: { id: user._id, name: user.name, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};
