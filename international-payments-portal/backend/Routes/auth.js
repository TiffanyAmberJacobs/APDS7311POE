import { Router } from 'express';
import { genSalt, hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User, { findOne } from '../models/User';
const router = Router();

// Register route
router.post('/register', async (req, res) => {
    const { fullName, idNumber, accountNumber, password } = req.body;

    // Check if all fields are provided
    if (!fullName || !idNumber || !accountNumber || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if account number already exists
        const existingUser = await findOne({ accountNumber });
        if (existingUser) {
            return res.status(400).json({ message: 'Account number already in use' });
        }

        // Hash the password
        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        // Save new user
        const newUser = new User({
            fullName,
            idNumber,
            accountNumber,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: savedUser._id,
                fullName: savedUser.fullName,
                accountNumber: savedUser.accountNumber,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error saving user', error: error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { accountNumber, password } = req.body;

    // Check if both fields are provided
    if (!accountNumber || !password) {
        return res.status(400).json({ message: 'Both account number and password are required' });
    }

    try {
        // Check if the user exists
        const user = await findOne({ accountNumber });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate password
        const validPassword = await compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send response with the token
        res.header('Authorization', token).json({
            message: 'Login successful',
            token: token,
            user: {
                id: user._id,
                fullName: user.fullName,
                accountNumber: user.accountNumber
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

export default router;
