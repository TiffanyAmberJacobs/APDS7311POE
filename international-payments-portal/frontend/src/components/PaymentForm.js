import React from 'react';
import './Register.css'


function PaymentForm({ paymentData, handlePaymentChange, handlePayment, message }) {
  return (
    <div>
      <h2>SWIFT Payment</h2>
      <form onSubmit={handlePayment}>
        <div>
          <label htmlFor="swiftCode">SWIFT/BIC Code</label>
          <input
            id="swiftCode"
            type="text"
            name="swiftCode"
            value={paymentData.swiftCode}
            onChange={handlePaymentChange}
            required
            placeholder="Enter SWIFT Code"
          />
        </div>

        <div>
          <label htmlFor="accountNumber">Beneficiary Account Number</label>
          <input
            id="accountNumber"
            type="text"
            name="accountNumber"
            value={paymentData.accountNumber}
            onChange={handlePaymentChange}
            required
            placeholder="Enter Account Number"
          />
        </div>

        <div>
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            name="amount"
            value={paymentData.amount}
            onChange={handlePaymentChange}
            required
            min="1"
            step="any"
            placeholder="Enter Amount"
          />
        </div>

        <div>
          <label htmlFor="currency">Currency</label>
          <select
            id="currency"
            name="currency"
            value={paymentData.currency}
            onChange={handlePaymentChange}
            required
          >
            <option value="">Select Currency</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            {/* You can add more currency options as needed */}
          </select>
        </div>

        <div>
          <label htmlFor="beneficiaryName">Beneficiary Name</label>
          <input
            id="beneficiaryName"
            type="text"
            name="beneficiaryName"
            value={paymentData.beneficiaryName}
            onChange={handlePaymentChange}
            required
            placeholder="Enter Beneficiary Name"
          />
        </div>

        <div>
          <label htmlFor="beneficiaryAddress">Beneficiary Address</label>
          <input
            id="beneficiaryAddress"
            type="text"
            name="beneficiaryAddress"
            value={paymentData.beneficiaryAddress}
            onChange={handlePaymentChange}
            placeholder="Enter Beneficiary Address"
          />
        </div>

        <button type="submit">Submit Payment</button>
      </form>

      {/* Display any message (e.g., success or error) */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default PaymentForm;
