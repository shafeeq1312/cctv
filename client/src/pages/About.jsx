import React from 'react';
import { ShieldCheck, Award, Users, Wrench, CheckCircle2, MapPin, Navigation, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const mapLink = "https://maps.app.goo.gl/FwVyyiXLg31W64mx9";
  const dindigulAddress = "17, Aarthi Theatre Rd, Y.M.R. Patty, Karunanidhi Nagar, Dindigul, Tamil Nadu 624001";

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10 space-y-16 animate-fade-in">
      
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-950/80 px-4 py-1.5 rounded-full border border-cyan-300 dark:border-cyan-800/60 inline-flex items-center gap-1.5 shadow-md">
          <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> Serving Dindigul Since 2013
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          About Lucky Communication
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
          Trusted CCTV, biometric attendance, access control, and complete security infrastructure specialists in Dindigul for over 13 years.
        </p>
      </div>

      {/* Main Story & Values Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-block bg-blue-100 dark:bg-blue-900/40 border border-blue-300 dark:border-blue-500/30 text-blue-700 dark:text-blue-400 px-3.5 py-1 rounded-full text-xs font-extrabold">
            Dindigul's Premier Security Provider
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Delivering Reliable Security Infrastructure Solutions <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-400 dark:to-indigo-400 bg-clip-text text-transparent">Since 2013</span>
          </h2>

          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-medium">
            Established in 2013 at <strong className="text-slate-900 dark:text-white">17, Aarthi Theatre Road, Dindigul</strong>, Lucky Communication has been dedicated to protecting homes, retail shops, offices, colleges, and industrial factories across Dindigul and surrounding areas.
          </p>

          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-medium">
            We supply 100% genuine CCTV security cameras, biometric attendance machines, DVR/NVR video recorders, and door access controls from industry-leading brands including Hikvision, CP Plus, Dahua, and eSSL with full manufacturer warranty.
          </p>

          {/* Core Pillars List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              '100% Genuine Products Since 2013',
              'Neat & Clean PVC Cabling Setup',
              'Honest & Transparent Dindigul Pricing',
              'Fast Emergency On-Site Service',
              'Full Manufacturer Warranty Support',
              'Free Dindigul Site Inspection'
            ].map((pillar, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 font-extrabold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{pillar}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              to="/products"
              className="btn-primary-glow text-white font-black text-xs px-6 py-3.5 rounded-xl shadow-lg active:scale-95"
            >
              Explore Products Catalog
            </Link>

            <a
              href={mapLink}
              target="_blank"
              rel="noreferrer"
              className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-cyan-600 dark:text-cyan-400 border border-slate-300 dark:border-slate-700 font-extrabold text-xs px-6 py-3.5 rounded-xl flex items-center gap-2 transition shadow-md"
            >
              <Navigation className="w-4 h-4" /> Get Directions to Store
            </a>
          </div>
        </div>

        {/* Right Image Container */}
        <div className="lg:col-span-6">
          <div className="relative rounded-3xl p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden group">
            <img
              src="/images/lucky_banner.png"
              alt="Lucky Communication Dindigul Official Showroom Banner"
              className="w-full h-auto max-h-[460px] object-contain rounded-2xl group-hover:scale-105 transition-transform duration-700 bg-slate-950/80 p-1"
            />
          </div>
        </div>

      </div>

      {/* 4 Stats Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        
        <div className="bg-white dark:bg-slate-900/90 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-2 shadow-md hover:border-blue-500/50 transition">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-800/60 flex items-center justify-center mx-auto mb-2">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-black text-slate-900 dark:text-white">Since 2013</h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs font-bold">13+ Years Serving Dindigul</p>
        </div>

        <div className="bg-white dark:bg-slate-900/90 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-2 shadow-md hover:border-emerald-500/50 transition">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/60 flex items-center justify-center mx-auto mb-2">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-black text-slate-900 dark:text-white">1,000+</h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs font-bold">Installations Completed</p>
        </div>

        <div className="bg-white dark:bg-slate-900/90 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-2 shadow-md hover:border-cyan-500/50 transition">
          <div className="w-12 h-12 rounded-2xl bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-800/60 flex items-center justify-center mx-auto mb-2">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-black text-slate-900 dark:text-white">100%</h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs font-bold">Genuine Authentic Hardware</p>
        </div>

        <div className="bg-white dark:bg-slate-900/90 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-2 shadow-md hover:border-amber-500/50 transition">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 border border-amber-300 dark:border-amber-800/60 flex items-center justify-center mx-auto mb-2">
            <Wrench className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-black text-slate-900 dark:text-white">24/7</h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs font-bold">On-Site Technician Support</p>
        </div>

      </div>

      {/* Store Location Info Box */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2 justify-center md:justify-start">
            <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Visit Our Dindigul Store
          </h3>
          <p className="text-slate-700 dark:text-slate-300 text-xs max-w-xl font-medium leading-relaxed">
            {dindigulAddress}
          </p>
        </div>

        <a
          href={mapLink}
          target="_blank"
          rel="noreferrer"
          className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 transition shrink-0"
        >
          <Navigation className="w-4 h-4" /> Open Directions on Google Maps
        </a>
      </div>

    </div>
  );
};

export default About;
