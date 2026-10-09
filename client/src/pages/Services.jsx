import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  Wrench, 
  Fingerprint, 
  KeyRound, 
  Network, 
  ShieldCheck, 
  CheckCircle, 
  ArrowRight,
  Phone,
  MessageSquare
} from 'lucide-react';
import API from '../services/api';
import { getCachedServices, setCachedServices } from '../services/dataCache';
import { FALLBACK_SERVICES } from '../services/fallbackData';
import EnquiryModal from '../components/EnquiryModal';

const Services = () => {
  const cached = getCachedServices();
  const [services, setServices] = useState(
    Array.isArray(cached) && cached.length > 0 ? cached : FALLBACK_SERVICES
  );
  const [loading, setLoading] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await API.get('/services');
      if (res.data?.success && Array.isArray(res.data.services) && res.data.services.length > 0) {
        setServices(res.data.services);
        setCachedServices(res.data.services);
      }
    } catch (err) {
      console.warn('Failed to fetch live services, using cached fallback:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Camera':
        return <Camera className="w-7 h-7 text-blue-400" />;
      case 'Wrench':
        return <Wrench className="w-7 h-7 text-emerald-400" />;
      case 'Fingerprint':
        return <Fingerprint className="w-7 h-7 text-purple-400" />;
      case 'KeyRound':
        return <KeyRound className="w-7 h-7 text-amber-400" />;
      case 'Network':
        return <Network className="w-7 h-7 text-cyan-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-7 h-7 text-rose-400" />;
      default:
        return <ShieldCheck className="w-7 h-7 text-blue-400" />;
    }
  };

  const handleOpenEnquiry = (serviceTitle) => {
    setSelectedService(`Service Enquiry: ${serviceTitle}`);
    setEnquiryModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-4 py-1.5 rounded-full border border-emerald-300 dark:border-emerald-800/60 shadow-sm">
          Professional Security Services
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          CCTV Installation, Maintenance & AMC
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-medium">
          From residential CCTV camera fitting to enterprise biometric network integration and annual maintenance contracts (AMC), Lucky Communication offers complete security coverage.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((svc) => (
          <div
            key={svc._id || svc.title}
            className="bg-white dark:bg-slate-800/80 p-8 rounded-3xl border border-slate-200 dark:border-slate-700/60 hover:border-blue-500/50 hover:shadow-2xl transition-all duration-300 shadow-lg flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                {getServiceIcon(svc.icon)}
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                {svc.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {svc.description}
              </p>

              {/* Service Features */}
              {svc.features && svc.features.length > 0 && (
                <ul className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700/60">
                  {svc.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                      <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              onClick={() => handleOpenEnquiry(svc.title)}
              className="w-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-600 dark:hover:bg-blue-600 text-slate-800 dark:text-slate-200 hover:text-white border border-slate-300 dark:border-slate-700 hover:border-blue-500 font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition"
            >
              Book Service <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Call to Action Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Require Emergency CCTV Repair or AMC Contract?
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm max-w-2xl mx-auto font-medium">
          Our team of technicians is equipped with field tools for quick diagnosis, camera replacement, DVR hard drive replacement, and cable repair.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <a
            href="tel:+919876543210"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm transition"
          >
            <Phone className="w-4 h-4" /> Call +91 98765 43210
          </a>
          <a
            href="https://wa.me/919876543210?text=Hi%20Lucky%20Communication%2C%20I%20need%20a%20technician%20for%20CCTV%20service."
            target="_blank"
            rel="noreferrer"
            className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm transition"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> WhatsApp Technician
          </a>
        </div>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        productName={selectedService}
      />

    </div>
  );
};

export default Services;
