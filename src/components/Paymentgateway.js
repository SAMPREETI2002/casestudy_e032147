import React, { useState } from 'react';
import axios from 'axios';
import './payment-gateway.css';
import { useLocation } from 'react-router-dom'; // To access planId from the previous route
import { FaCreditCard, FaGooglePay, FaPaypal, FaPhone, FaWallet } from 'react-icons/fa';

function Payment() {
  const location = useLocation(); // Get the state from the previous page
  const { planId } = location.state || {}; // Access the planId passed from PrepaidPlans

  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [bankName, setBankName] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiOption, setUpiOption] = useState('');
  const [walletBalance, setWalletBalance] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare data based on the selected payment method
      let data = { paymentMethod, planId }; // Include planId in the data
      if (paymentMethod === 'card') {
        data = { ...data, cardNumber, cardName, bankName, cvv };
      } else if (paymentMethod === 'upi') {
        data = { ...data, upiOption };
      } else if (paymentMethod === 'wallet') {
        data = { ...data, walletBalance };
      }
      // Make the POST request to the backend
      const token = localStorage.getItem('token');
      console.log("Token from localStorage:", token);
      await axios.post('http://localhost:9099/payInvoice', data, {
        headers: {
          'x-access-token': localStorage.getItem('token') // Adjust the token handling as needed
        }
        
      });
      alert('Payment successful');
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Error processing payment');
    }
  };

  return (
    <div className="container">
      <h2>Choose Payment options for Plan ID: {planId}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            <input type="radio" name="paymentMethod" value="card" onChange={() => setPaymentMethod('card')} />
            <FaCreditCard size={30} color="#000" /> Credit/Debit Card
          </label>
          {paymentMethod === 'card' && (
            <div className="payment-details">
              <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
              <input type="text" placeholder="Card Name" value={cardName} onChange={(e) => setCardName(e.target.value)} required />
              <input type="text" placeholder="Bank Name" value={bankName} onChange={(e) => setBankName(e.target.value)} required />
              <input type="text" placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
            </div>
          )}
        </div>

        <div className="form-group">
          <label>
            <input type="radio" name="paymentMethod" value="upi" onChange={() => setPaymentMethod('upi')} />
            <FaGooglePay size={30} color="#000" /> UPI
          </label>
          {paymentMethod === 'upi' && (
            <div className="payment-details">
              <label>
                <input type="radio" name="upiOption" value="gpay" onChange={() => setUpiOption('gpay')} />
                <FaGooglePay size={30} color="#000" /> Google Pay
              </label>
              <label>
                <input type="radio" name="upiOption" value="paytm" onChange={() => setUpiOption('paytm')} />
                <FaPaypal size={30} color="#000" /> Paytm
              </label>
              <label>
                <input type="radio" name="upiOption" value="phonepe" onChange={() => setUpiOption('phonepe')} />
                <FaPhone size={30} color="#000" /> PhonePe
              </label>
            </div>
          )}
        </div>

        <div className="form-group">
          <label>
            <input type="radio" name="paymentMethod" value="wallet" onChange={() => setPaymentMethod('wallet')} />
            <FaWallet size={30} color="#000" /> Wallet
          </label>
          {paymentMethod === 'wallet' && (
            <div className="payment-details">
              <input type="number" placeholder="Wallet Balance" value={walletBalance} onChange={(e) => setWalletBalance(e.target.value)} required />
            </div>
          )}
        </div>

        <button type="submit">Pay</button>
      </form>
    </div>
  );
}

export default Payment;
