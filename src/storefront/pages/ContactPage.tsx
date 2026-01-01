import React, { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1
            className="mb-6 tracking-[0.3em]"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            }}
          >
            VISIT US!
          </h1>
          <p
            className="text-white/70"
            style={{ fontFamily: "'Allura', cursive", fontSize: '2rem' }}
          >
            We'd love to hear from you
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#121214] border border-white/10 p-8 text-center hover:border-white/30 transition-colors duration-300">
            <Phone className="w-8 h-8 mx-auto mb-4 text-white/60" />
            <h3
              className="mb-3 tracking-[0.2em]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              PHONE
            </h3>
            <p className="text-white/70 mb-2">09106960483</p>
            <p className="text-white/70">09216625949</p>
          </div>

          <div className="bg-[#121214] border border-white/10 p-8 text-center hover:border-white/30 transition-colors duration-300">
            <MapPin className="w-8 h-8 mx-auto mb-4 text-white/60" />
            <h3
              className="mb-3 tracking-[0.2em]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              ADDRESS
            </h3>
            <p className="text-white/70 mb-2">Zone 4 Camba, Arayat, Pampanga</p>
            <p className="text-white/70">243, San Pablo, Mexico, Pampanga</p>
          </div>

          <div className="bg-[#121214] border border-white/10 p-8 text-center hover:border-white/30 transition-colors duration-300">
            <Mail className="w-8 h-8 mx-auto mb-4 text-white/60" />
            <h3
              className="mb-3 tracking-[0.2em]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              EMAIL
            </h3>
            <p className="text-white/70">reverierevival.co@gmail.com</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-[#121214] border border-white/10 p-8">
            <h2
              className="mb-6 tracking-[0.2em]"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.5rem' }}
            >
              SEND US A MESSAGE
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 tracking-[0.15em]"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  NAME *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0B0B0C] border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 tracking-[0.15em]"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  EMAIL *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0B0B0C] border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 tracking-[0.15em]"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  PHONE
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#0B0B0C] border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition-colors"
                  placeholder="09XX XXX XXXX"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 tracking-[0.15em]"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  MESSAGE *
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#0B0B0C] border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition-colors resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-white text-[#0B0B0C] tracking-[0.2em] hover:bg-[#E10613] hover:text-white transition-all duration-300"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                SEND MESSAGE
              </button>
            </form>
          </div>

          {/* Map & Info */}
          <div className="space-y-6">
            {/* Embedded Map Placeholder */}
            <div className="bg-[#121214] border border-white/10 aspect-square flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-white/40" />
                <p className="text-white/60 mb-4">Map View</p>
                <p className="text-white/40">
                  Zone 4 Camba, Arayat, Pampanga<br />
                  243, San Pablo, Mexico, Pampanga
                </p>
              </div>
            </div>

            {/* Store Hours */}
            <div className="bg-[#121214] border border-white/10 p-8">
              <h3
                className="mb-6 tracking-[0.2em]"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                STORE HOURS
              </h3>
              <div className="space-y-3 text-white/70">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>10:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>11:00 AM - 7:00 PM</span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-[#121214] border border-white/10 p-8">
              <h3
                className="mb-4 tracking-[0.2em]"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                VISIT US IN PERSON
              </h3>
              <p className="text-white/70 leading-relaxed">
                Come experience our collection firsthand. Our team is here to help you find the perfect pieces to express your style. Walk-ins welcome, or book an appointment for personalized styling assistance.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2
            className="mb-12 text-center tracking-[0.3em]"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            }}
          >
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'Do you offer international shipping?',
                a: 'Currently, we ship within the Philippines only. International shipping will be available soon.',
              },
              {
                q: 'What is your return policy?',
                a: 'We accept returns within 30 days of purchase. Items must be unworn with tags attached.',
              },
              {
                q: 'Can I exchange items?',
                a: 'Yes! Exchanges are accepted within 30 days. Contact us for assistance.',
              },
              {
                q: 'Do you have a physical store?',
                a: 'Yes, visit us at our locations in Pampanga. See our addresses above.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-[#121214] border border-white/10 p-6">
                <h4
                  className="mb-3 tracking-[0.15em]"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {faq.q}
                </h4>
                <p className="text-white/70">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
