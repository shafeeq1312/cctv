import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Users, 
  Wrench, 
  CheckCircle2, 
  MapPin, 
  Navigation, 
  Calendar,
  Layers,
  HeartHandshake,
  Clock,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedCounter from '../components/AnimatedCounter';

const About = () => {
  const mapLink = "https://maps.app.goo.gl/FwVyyiXLg31W64mx9";
  const dindigulAddress = "17, Aarthi Theatre Rd, Y.M.R. Patty, Karunanidhi Nagar, Dindigul, Tamil Nadu 624001";

  const stats = [
    {
      icon: Users,
      end: 1000,
      suffix: '+',
      title: 'Installations Completed',
      subtitle: 'Homes, Shops, Offices & Factories',
      color: 'emerald'
    },
    {
      icon: Calendar,
      end: 13,
      suffix: '+ Years',
      title: 'Industry Experience',
      subtitle: 'Proudly serving Dindigul since 2013',
      color: 'blue'
    },
    {
      icon: Layers,
      end: 6,
      suffix: '+',
      title: 'Core Security Services',
      subtitle: 'CCTV, Biometrics, AMC & Cabling',
      color: 'purple'
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'emerald':
        return {
          bg: 'bg-emerald-100 dark:bg-emerald-950/50',
          text: 'text-emerald-600 dark:text-emerald-400',
          border: 'border-emerald-300 dark:border-emerald-800/60',
          hover: 'hover:border-emerald-500/60 dark:hover:border-emerald-500/60'
        };
      case 'blue':
        return {
          bg: 'bg-blue-100 dark:bg-blue-950/50',
          text: 'text-blue-600 dark:text-blue-400',
          border: 'border-blue-300 dark:border-blue-800/60',
          hover: 'hover:border-blue-500/60 dark:hover:border-blue-500/60'
        };
      case 'purple':
        return {
          bg: 'bg-purple-100 dark:bg-purple-950/50',
          text: 'text-purple-600 dark:text-purple-400',
          border: 'border-purple-300 dark:border-purple-800/60',
          hover: 'hover:border-purple-500/60 dark:hover:border-purple-500/60'
        };
      case 'cyan':
        return {
          bg: 'bg-cyan-100 dark:bg-cyan-950/50',
          text: 'text-cyan-600 dark:text-cyan-400',
          border: 'border-cyan-300 dark:border-cyan-800/60',
          hover: 'hover:border-cyan-500/60 dark:hover:border-cyan-500/60'
        };
      case 'rose':
        return {
          bg: 'bg-rose-100 dark:bg-rose-950/50',
          text: 'text-rose-600 dark:text-rose-400',
          border: 'border-rose-300 dark:border-rose-800/60',
          hover: 'hover:border-rose-500/60 dark:hover:border-rose-500/60'
        };
      case 'amber':
      default:
        return {
          bg: 'bg-amber-100 dark:bg-amber-950/50',
          text: 'text-amber-600 dark:text-amber-400',
          border: 'border-amber-300 dark:border-amber-800/60',
          hover: 'hover:border-amber-500/60 dark:hover:border-amber-500/60'
        };
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10 space-y-16 animate-fade-in">
      
      {/* 1. Header Banner */}
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

      {/* 2. Main Story & Showroom Banner */}
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

        {/* Right Showroom Image */}
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

      {/* 3. ANIMATED STATISTICS & MILESTONES (0 to 1000+ Count-Up Animation) */}
      <section className="space-y-6 pt-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-cyan-700 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-950/80 px-3.5 py-1 rounded-full border border-cyan-300 dark:border-cyan-800/60 inline-flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" /> Proven Track Record
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Our Milestones & Key Numbers
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-medium max-w-xl mx-auto">
            Real figures reflecting our dedication to surveillance security and client trust over the past 13+ years.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((st, idx) => {
            const classes = getColorClasses(st.color);
            const Icon = st.icon;
            return (
              <div 
                key={idx}
                className={`bg-white dark:bg-slate-900/90 p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg ${classes.hover} transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group relative overflow-hidden`}
              >
                {/* Glow accent in top right */}
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>

                <div className="flex items-start justify-between gap-4">
                  <div className={`w-14 h-14 rounded-2xl ${classes.bg} ${classes.text} border ${classes.border} flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Live Count Number (Animates from 0 to target) */}
                  <div className="text-right">
                    <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                      <AnimatedCounter end={st.end} suffix={st.suffix} duration={2200} />
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-1">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    {st.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs font-semibold">
                    {st.subtitle}
                  </p>
                </div>

                {/* Bottom decorative bar */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Verified Record
                  </span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-extrabold">Dindigul, TN</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Store Location Info Box */}
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
