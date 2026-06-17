import React from 'react';

const SecurePayment = () => {
  return (
    <div style={{ padding: '30px' }}>
      <h1>🔒 Secure Payment</h1>

      <h2>Supported Methods</h2>

      <ul>
        <li>UPI Payments</li>
        <li>Credit Cards</li>
        <li>Debit Cards</li>
        <li>Net Banking</li>
      </ul>

      <h2>Safety Features</h2>

      <ul>
        <li>SSL Encrypted Transactions</li>
        <li>Protected Checkout</li>
        <li>Secure Payment Gateway</li>
        <li>No Card Data Stored</li>
      </ul>

      <h2>Tips</h2>

      <p>
        Never share OTPs, passwords or bank details
        with anyone.
      </p>
    </div>
  );
};

export default SecurePayment;