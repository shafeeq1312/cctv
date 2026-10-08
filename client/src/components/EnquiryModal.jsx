import React, { useState } from 'react';
import { X, Send, CheckCircle, AlertCircle, Phone, Mail, User, MessageSquare, Package } from 'lucide-react';
import API from '../services/api';

const EnquiryModal = ({ isOpen, onClose, productName = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    product: productName || 'General Enquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.phone || !formData.email || !formData.message) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/enquiries', formData);
      if (res.data.success) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose();
          setFormData({
            name: '',
            phone: '',
            email: '',
            product: productName || 'General Enquiry',
            message: ''
          });
        }, 2200);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-slate-800/80 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-400" /> Send Product Enquiry
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Fill out the form below to get an instant call back & quote.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-700/50 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {success ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40 animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white">Enquiry Submitted!</h4>
              <p className="text-slate-300 text-sm max-w-xs mx-auto">
                Thank you for contacting Lucky Communication. Our security expert will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                </div>
              )}

              {/* Product Info */}
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">
                  Product / Solution
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    className="w-full bg-slate-800 text-white text-sm px-4 py-2.5 pl-10 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500"
                    placeholder="Product name"
                  />
                  <Package className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">
                  Your Name <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-slate-800 text-white text-sm px-4 py-2.5 pl-10 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500"
                    placeholder="Enter your name"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    Phone Number <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-800 text-white text-sm px-4 py-2.5 pl-10 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500"
                      placeholder="9876543210"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-slate-800 text-white text-sm px-4 py-2.5 pl-10 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500"
                      placeholder="customer@gmail.com"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">
                  Enquiry Message <span className="text-rose-400">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-slate-800 text-white text-sm p-3 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="Tell us your requirement (e.g. I need 4 cameras installed for my shop)..."
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Submit Enquiry
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default EnquiryModal;
