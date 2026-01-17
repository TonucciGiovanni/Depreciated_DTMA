'use client';

import React, { useState } from 'react';
import { ChevronDown, Plus, Globe } from 'lucide-react';

export default function CheckoutArea() {
  const [selectedPayment, setSelectedPayment] = useState('card1');
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('United Arab Emirates');
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const countries = [
    'United Arab Emirates',
    'United States',
    'United Kingdom',
    'Canada',
    'Australia'
  ];

  const paymentMethods = [
    { id: 'card1', type: 'amex', last4: '4765', name: 'Faisal Mohammed' },
    { id: 'card2', type: 'mastercard', last4: '4765', name: 'Faisal Mohammed' },
    { id: 'card3', type: 'visa', last4: '4765', name: 'Faisal Mohammed' }
  ];

  const handleInputChange = (field, value) => {
    setCardDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const AmexIcon = () => (
    <div className="w-9 h-6 bg-blue-600 rounded flex items-center justify-center">
      <span className="text-white text-xs font-bold">AMEX</span>
    </div>
  );

  const MastercardIcon = () => (
    <div className="w-9 h-6 flex items-center justify-center">
      <div className="flex">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full -ml-1"></div>
      </div>
    </div>
  );

  const VisaIcon = () => (
    <div className="w-9 h-6 bg-white border rounded flex items-center justify-center">
      <span className="text-blue-800 text-xs font-bold">VISA</span>
    </div>
  );

  const getPaymentIcon = (type) => {
    switch (type) {
      case 'amex': return <AmexIcon />;
      case 'mastercard': return <MastercardIcon />;
      case 'visa': return <VisaIcon />;
      default: return <AmexIcon />;
    }
  };

  return (
    <div className="flex flex-col items-center gap-20 bg-white min-h-screen p-8">
      <div className="flex w-full max-w-7xl gap-8">
        {/* Left Section - Main Checkout */}
        <div className="flex-1 max-w-3xl">
          <div className="flex flex-col gap-15">
            {/* Billing Address Section */}
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-8">Checkout</h2>
              
              <div className="mb-8">
                <h3 className="text-xl text-gray-900 mb-4">Billing Address</h3>
              </div>

              <div className="mb-8">
                <h4 className="text-xl text-gray-900 mb-4">Country</h4>
                <div className="relative">
                  <button
                    onClick={() => setIsCountryOpen(!isCountryOpen)}
                    className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-white hover:border-gray-400 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Globe className="w-6 h-6 text-gray-600" />
                      <span className="text-sm text-gray-900">{selectedCountry}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isCountryOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isCountryOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                      {countries.map((country) => (
                        <button
                          key={country}
                          onClick={() => {
                            setSelectedCountry(country);
                            setIsCountryOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                        >
                          {country}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-2 ml-2">
                  DTMA is required by law to collect applicable transaction taxes for purchases made in certain tax jurisdictions.
                </p>
              </div>
            </div>

            {/* Payment Methods Section */}
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <h3 className="text-xl text-gray-900 mb-6">Payment Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`relative p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedPayment === method.id
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPayment(method.id)}
                  >
                    <div className="absolute top-4 left-4">
                      {getPaymentIcon(method.type)}
                    </div>
                    <div className="mt-8">
                      <div className="text-sm text-gray-600">**** **** **** {method.last4}</div>
                      <div className="text-sm text-gray-600">{method.name}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setShowCardForm(!showCardForm)}
                className="flex items-center gap-4 p-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Plus className="w-6 h-6" />
                <span className="text-sm">Add payment method</span>
              </button>
            </div>

            {/* New Card Form - Only shows when showCardForm is true */}
            {showCardForm && (
              <div className="bg-white rounded-lg p-5 border border-gray-200">
                <div className="space-y-6">
                  <div>
                    <label className="block text-xl text-gray-900 mb-5">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                      value={cardDetails.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xl text-gray-900 mb-6">Exp. Date</label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                        value={cardDetails.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xl text-gray-900 mb-6">CVC / CVV</label>
                      <input
                        type="text"
                        placeholder="CVC"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                        value={cardDetails.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xl text-gray-900 mb-6">Name on Card</label>
                    <input
                      type="text"
                      placeholder="Name on Card"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                      value={cardDetails.nameOnCard}
                      onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                    />
                    <button className="mt-6 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Order Details */}
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Order Details</h3>
                <span className="text-xl text-gray-900">(1 Course) :</span>
              </div>
              
              <div className="flex justify-between items-center p-5 bg-white">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-14 bg-gray-200 rounded-t-lg"></div>
                  <span className="text-sm font-semibold text-gray-900 max-w-xs">
                    Revolutionizing Procurement with Digital Tools
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-900">1000 Credits</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg p-5 border border-gray-200 sticky top-8">
            <div className="space-y-6">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Order Summary</h3>
                
                <div className="space-y-8">
                  <div className="flex justify-between items-start">
                    <span className="text-sm text-gray-600">Original Price</span>
                    <span className="text-sm font-semibold text-gray-700">1000 Credits</span>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-bold text-gray-700">Total (1 Course):</span>
                    <span className="text-sm font-bold text-gray-700">1000</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-3 px-6 border border-gray-400 text-gray-500 rounded hover:bg-gray-50 transition-colors font-bold">
                Purchase & Enroll
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}