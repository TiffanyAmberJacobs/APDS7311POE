// routes/payment.js
import { Router } from 'express';
import Payment from '../models/Payment';
import { validateSWIFT } from '../middleware/validation';
import authMiddleware from '../middleware/auth';

const router = Router();

// Payment submission route
router.post('/submit-payment', authMiddleware, async (req, res) => {
    const { swiftCode, amount, currency, accountNumber } = req.body;

    if (!validateSWIFT(swiftCode)) {
        return res.status(400).json({ message: 'Invalid SWIFT code' });
    }

    const newPayment = new Payment({
        swiftCode,
        amount,
        currency,
        accountNumber,
    });

    try {
        const savedPayment = await newPayment.save();
        res.status(201).json(savedPayment);
    } catch (error) {
        res.status(400).json({ message: 'Error processing payment' });
    }
});

export default router;
