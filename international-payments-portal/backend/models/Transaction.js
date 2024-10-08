const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  provider: { type: String, required: true },
  recipient_account_number: { type: String, required: true },
  swift_code: { type: String, required: true },
  status: { type: String, enum: ['pending', 'verified', 'submitted'], default: 'pending' },
  created_at: { type: Date, default: Date.now },
  verified_at: { type: Date },
  submitted_at: { type: Date }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
