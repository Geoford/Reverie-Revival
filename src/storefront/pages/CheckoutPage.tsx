import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CreditCard, Truck, CheckCircle2 } from 'lucide-react';

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { cart, getCartTotal, clearCart } = useStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    // Payment
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const formatPrice = (price: number) => `₱${price.toLocaleString()}`;
  const shippingCost = getCartTotal() >= 2000 ? 0 : 150;
  const total = getCartTotal() + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(3);
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  if (cart.length === 0 && currentStep !== 3) {
    onNavigate('shop');
    return null;
  }

  if (currentStep === 3) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-md">
          <CheckCircle2 className="w-20 h-20 mx-auto mb-6 text-[#E10613]" />
          <h2
            className="mb-4 tracking-[0.2em]"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            }}
          >
            ORDER CONFIRMED!
          </h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Thank you for your order. You will receive a confirmation email shortly with your order details and tracking information.
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="px-8 py-4 bg-white text-[#0B0B0C] tracking-[0.2em] hover:bg-[#E10613] hover:text-white transition-all duration-300"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1
          className="mb-12 text-center tracking-[0.3em]"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
          }}
        >
          CHECKOUT
        </h1>

        {/* Progress Steps */}
        <div className="mb-12 flex justify-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                  currentStep >= 1 ? 'border-white bg-white text-[#0B0B0C]' : 'border-white/30'
                }`}
              >
                1
              </div>
              <span className="ml-2 tracking-[0.1em]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                SHIPPING
              </span>
            </div>
            <div className="w-12 h-[2px] bg-white/30" />
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                  currentStep >= 2 ? 'border-white bg-white text-[#0B0B0C]' : 'border-white/30'
                }`}
              >
                2
              </div>
              <span className="ml-2 tracking-[0.1em]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                PAYMENT
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Information */}
              {currentStep === 1 && (
                <div className="bg-[#121214] border border-white/10 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Truck className="w-6 h-6" />
                    <h2
                      className="tracking-[0.2em]"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      SHIPPING INFORMATION
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2">First Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full bg-[#0B0B0C] border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Last Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full bg-[#0B0B0C] border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#0B0B0C] border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#0B0B0C] border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block mb-2">Address *</label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-[#0B0B0C] border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">City *</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-[#0B0B0C] border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Province *</label>
                      <input
                        type="text"
                        required
                        value={formData.province}
                        onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                        className="w-full bg-[#0B0B0C] border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="mt-6 w-full py-4 bg-white text-[#0B0B0C] tracking-[0.2em] hover:bg-[#E10613] hover:text-white transition-all duration-300"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    CONTINUE TO PAYMENT
                  </button>
                </div>
              )}

              {/* Payment Information */}
              {currentStep === 2 && (
                <div className="bg-[#121214] border border-white/10 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="w-6 h-6" />
                    <h2
                      className="tracking-[0.2em]"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      PAYMENT INFORMATION
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block mb-2">Card Number *</label>
                      <input
                        type="text"
                        required
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full bg-[#0B0B0C] border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Cardholder Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.cardName}
                        onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                        className="w-full bg-[#0B0B0C] border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-2">Expiry Date *</label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                          className="w-full bg-[#0B0B0C] border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block mb-2">CVV *</label>
                        <input
                          type="text"
                          required
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                          className="w-full bg-[#0B0B0C] border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 py-4 border border-white/30 tracking-[0.2em] hover:bg-white hover:text-[#0B0B0C] transition-all duration-300"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      BACK
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-4 bg-white text-[#0B0B0C] tracking-[0.2em] hover:bg-[#E10613] hover:text-white transition-all duration-300"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      PLACE ORDER
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#121214] border border-white/10 p-6 sticky top-24">
                <h2
                  className="mb-6 tracking-[0.2em]"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  ORDER SUMMARY
                </h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-white/10">
                  {cart.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-16 h-20 bg-[#0B0B0C] border border-white/10">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate mb-1">{item.product.name}</p>
                        <p className="text-sm text-white/60">
                          {item.size} / {item.color}
                        </p>
                        <p className="text-sm text-white/60">Qty: {item.quantity}</p>
                      </div>
                      <div>{formatPrice(item.unitPrice * item.quantity)}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                  <div className="flex justify-between text-white/80">
                    <span>Subtotal</span>
                    <span>{formatPrice(getCartTotal())}</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="tracking-[0.15em]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    TOTAL
                  </span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
