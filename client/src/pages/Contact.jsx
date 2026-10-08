import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, ExternalLink, CheckCircle2, AlertCircle, Navigation, Star, ThumbsUp, Sparkles } from 'lucide-react';
import API from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    product: 'General Contact Enquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const mapLink = "https://maps.app.goo.gl/FwVyyiXLg31W64mx9";
  const dindigulAddress = "17, Aarthi Theatre Rd, Y.M.R. Patty, Karunanidhi Nagar, Dindigul, Tamil Nadu 624001";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.phone || !formData.email || !formData.message) {
      setError('Please fill in all required contact fields');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/enquiries', formData);
      if (res.data.success) {
        setSuccess(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          product: 'General Contact Enquiry',
          message: ''
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Google Customer Reviews
  const reviews = [
    {
      id: 1,
      name: 'Karthik Raja',
      date: '2 weeks ago',
      rating: 5,
      review: 'Installed 8 CP Plus cameras at my shop near Aarthi Theatre Road. Neat conduit piping, fast installation and crystal clear 4K night vision! Highly recommended.',
      initials: 'KR',
      color: 'bg-blue-600'
    },
    {
      id: 2,
      name: 'Suresh Kumar',
      date: '1 month ago',
      rating: 5,
      review: 'Great experience with Lucky Communication Dindigul! Biometric face recognition attendance machine setup was done seamlessly within 2 hours.',
      initials: 'SK',
      color: 'bg-emerald-600'
    },
    {
      id: 3,
      name: 'Anand Varma',
      date: '1 month ago',
      rating: 5,
      review: 'Best CCTV camera prices in Dindigul. Technician arrived on time for repair service on my DVR hard disk. Excellent support 5/5 stars!',
      initials: 'AV',
      color: 'bg-amber-600'
    }
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-10 space-y-12 animate-fade-in">
      
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-700 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-950/80 px-4 py-1.5 rounded-full border border-cyan-300 dark:border-cyan-800/60 inline-flex items-center gap-1.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> Authorized CCTV & Security Store in Dindigul
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Get In Touch With <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 dark:from-blue-400 dark:via-cyan-400 dark:to-indigo-400 bg-clip-text text-transparent">Lucky Communication</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
          Visit our showroom at Aarthi Theatre Road, call our sales team directly, or send an enquiry for fast assistance.
        </p>
      </div>

      {/* 3 Quick Action Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Call Direct */}
        <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl hover:border-emerald-500/50 card-hover-effect flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-md">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Direct Call Support</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Instant phone assistance for quotes & queries</p>
            </div>
            <p className="text-sm font-black text-emerald-600 dark:text-emerald-400">+91 98765 43210</p>
          </div>

          <a
            href="tel:+919876543210"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-3 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition active:scale-95 mt-2"
          >
            <Phone className="w-4 h-4" /> Call Now
          </a>
        </div>

        {/* Card 2: WhatsApp Chat */}
        <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl hover:border-green-500/50 card-hover-effect flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-950 border border-green-300 dark:border-green-800/60 text-green-600 dark:text-green-400 flex items-center justify-center shadow-md">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">WhatsApp Chat</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Send specs or photos on WhatsApp</p>
            </div>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Quick Response Guaranteed</p>
          </div>

          <a
            href="https://wa.me/919876543210?text=Hello%20Lucky%20Communication%2C%20I%20want%20to%20enquire%20about%20CCTV%20products."
            target="_blank"
            rel="noreferrer"
            className="w-full bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-800 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/80 font-extrabold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition active:scale-95 mt-2"
          >
            <MessageSquare className="w-4 h-4" /> Start WhatsApp Chat
          </a>
        </div>

        {/* Card 3: Working Hours */}
        <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl hover:border-purple-500/50 card-hover-effect flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 border border-purple-300 dark:border-purple-800/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-md">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Working Hours</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 font-medium">Mon – Sat: 9:00 AM – 8:00 PM</p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-800/60 font-extrabold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Store Open Today
            </div>
          </div>

          <a
            href="mailto:luckycommunication@gmail.com"
            className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800/60 font-extrabold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition active:scale-95 mt-2"
          >
            <Mail className="w-4 h-4" /> Email Us
          </a>
        </div>

      </div>

      {/* Main 2-Column Layout: Form + Interactive Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Enquiry Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-xl space-y-6">
          <div>
            <div className="inline-block bg-blue-100 dark:bg-blue-950 border border-blue-300 dark:border-blue-800 text-blue-800 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-extrabold mb-2">
              Customer Enquiry Form
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Send Us Your Security Requirement
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 font-medium">
              Need CCTV camera installation, biometric attendance, or repair service? Submit your requirement below.
            </p>
          </div>

          {success ? (
            <div className="p-8 text-center space-y-4 bg-emerald-50 dark:bg-slate-950/90 rounded-2xl border border-emerald-300 dark:border-emerald-500/40 shadow-inner animate-slide-up">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-500/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white">Enquiry Submitted Successfully!</h4>
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                Thank you for reaching out to <strong>Lucky Communication Dindigul</strong>. Our technical support admin will review your message and contact your phone number shortly.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold px-6 py-3 rounded-xl transition shadow-lg shadow-blue-600/30"
              >
                Send Another Requirement
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3.5 bg-rose-100 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-800/80 rounded-xl text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2.5 font-semibold">
                  <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" /> {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1.5">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full bg-slate-50 dark:bg-slate-800/90 text-slate-900 dark:text-white text-xs px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700/80 focus:outline-none focus:border-cyan-500 transition shadow-inner"
                  />
                </div>

                <div>
                  <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1.5">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="w-full bg-slate-50 dark:bg-slate-800/90 text-slate-900 dark:text-white text-xs px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700/80 focus:outline-none focus:border-cyan-500 transition shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 dark:bg-slate-800/90 text-slate-900 dark:text-white text-xs px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700/80 focus:outline-none focus:border-cyan-500 transition shadow-inner"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1.5">
                  Requirement Details <span className="text-rose-500">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please specify your CCTV camera requirement, biometric model, or repair service query..."
                  className="w-full bg-slate-50 dark:bg-slate-800/90 text-slate-900 dark:text-white text-xs p-3.5 rounded-xl border border-slate-300 dark:border-slate-700/80 focus:outline-none focus:border-cyan-500 transition shadow-inner resize-none leading-relaxed"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black py-4 rounded-xl shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2.5 transition active:scale-95 disabled:opacity-50 text-xs sm:text-sm uppercase tracking-wider"
              >
                {loading ? 'Submitting Enquiry...' : <><Send className="w-4 h-4" /> Submit Customer Enquiry</>}
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Google Maps & Store Showcase */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Store Info & Map Preview Container */}
          <div className="bg-white dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /> Store Location Map
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Dindigul Town Showroom</p>
              </div>

              <a
                href={mapLink}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-bold flex items-center gap-1"
              >
                Open Google Maps <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Embedded Google Map */}
            <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-black/50 shadow-inner group">
              <iframe
                title="Lucky Communication Dindigul Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.494793630635!2d78.4744403148771!3d17.38504400870956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIzJzA2LjIiTiA3OMKwMjgnMzUuOSJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="brightness-95 contrast-105 group-hover:brightness-100 transition"
              ></iframe>

              <a
                href={mapLink}
                target="_blank"
                rel="noreferrer"
                className="absolute inset-0 bg-slate-900/20 hover:bg-slate-900/10 flex items-end justify-center p-4 transition"
              >
                <span className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-black px-5 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-blue-400/40">
                  <Navigation className="w-4 h-4" /> Open Directions on Google Maps
                </span>
              </a>
            </div>

            {/* Address Box */}
            <div className="p-4 bg-slate-100 dark:bg-slate-950/80 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
              <span className="font-extrabold text-slate-500 dark:text-slate-300 block uppercase tracking-wider text-[10px]">
                Full Store Address
              </span>
              <p className="text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
                Lucky Communication, {dindigulAddress}
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] pt-1 font-medium">
                Landmark: Near Aarthi Theatre, Y.M.R. Patty, Dindigul
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* GOOGLE CUSTOMER REVIEWS SECTION */}
      <section className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-8 shadow-xl">
        
        {/* Rating Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/80 px-3.5 py-1 rounded-full border border-amber-300 dark:border-amber-800/60 inline-flex items-center gap-1.5 shadow-sm">
              <Star className="w-3.5 h-3.5 fill-amber-500 dark:fill-amber-400 text-amber-500 dark:text-amber-400" /> Google Customer Reviews & Ratings
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Trusted by 1,000+ Dindigul Customers
            </h2>
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4.5 h-4.5 fill-amber-500 dark:fill-amber-400" />
                ))}
              </div>
              <span className="text-slate-900 dark:text-white font-black text-base">4.9 / 5.0 Rating</span>
              <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">(120+ Verified Google Reviews)</span>
            </div>
          </div>

          <a
            href={mapLink}
            target="_blank"
            rel="noreferrer"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-6 py-3.5 rounded-xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition transform active:scale-95 shrink-0"
          >
            <ExternalLink className="w-4 h-4" /> View & Post Review on Google Maps
          </a>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50 dark:bg-slate-950/90 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-md hover:border-amber-500/50 card-hover-effect flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${rev.color} text-white font-black text-xs flex items-center justify-center shadow-md`}>
                      {rev.initials}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">{rev.name}</h4>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{rev.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-amber-500 dark:text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-500 dark:fill-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed italic">
                  "{rev.review}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Customer
                </span>
                <span>Google Maps Review</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action Banner */}
        <div className="bg-slate-100 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <ThumbsUp className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="text-slate-700 dark:text-slate-300 font-semibold">
              Have you bought CCTV cameras or hired service from Lucky Communication Dindigul?
            </span>
          </div>

          <a
            href={mapLink}
            target="_blank"
            rel="noreferrer"
            className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-black flex items-center gap-1.5 transition underline shrink-0"
          >
            Leave a Google Review on Map <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </section>

    </div>
  );
};

export default Contact;
