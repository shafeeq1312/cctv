import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Lock, Navigation } from 'lucide-react';

const Footer = () => {
  const mapLink = "https://maps.app.goo.gl/FwVyyiXLg31W64mx9";
  const logoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj5Dh3X6wA63V0Bwc99yOUT_iB9wNTgGz1rph8VM1EJneCUgE42cQ3Wmop&s=10";
  const dindigulAddress = "17, Aarthi Theatre Rd, Y.M.R. Patty, Karunanidhi Nagar, Dindigul, Tamil Nadu 624001";

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 pt-12 pb-8 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* Simple & Neat 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 overflow-hidden flex items-center justify-center p-1 shadow-md">
                <img src={logoUrl} alt="Lucky Communication Logo" className="w-full h-full object-contain rounded-lg" />
              </div>
              <div>
                <span className="text-lg font-black text-slate-900 dark:text-white block leading-tight">
                  LUCKY <span className="text-blue-600 dark:text-cyan-400">COMMUNICATION</span>
                </span>
                <span className="text-[9px] tracking-widest text-cyan-700 dark:text-cyan-400 uppercase block font-black">
                  CCTV & Security Solutions
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Reliable CCTV cameras, biometric attendance devices, DVR/NVR recorders, access control and security solutions in Dindigul.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-black text-sm mb-3 border-l-2 border-cyan-500 pl-2.5">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <Link to="/" className="hover:text-cyan-500 transition">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-500 transition">About Us</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-cyan-500 transition">Products Catalog</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-500 transition">Services & AMC</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-500 transition">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-black text-sm mb-3 border-l-2 border-cyan-500 pl-2.5">
              Product Categories
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <Link to="/products?category=CCTV Cameras" className="hover:text-cyan-500 transition">CCTV Cameras</Link>
              </li>
              <li>
                <Link to="/products?category=Biometric Systems" className="hover:text-cyan-500 transition">Biometrics & Attendance</Link>
              </li>
              <li>
                <Link to="/products?category=DVR / NVR" className="hover:text-cyan-500 transition">DVR / NVR Recorders</Link>
              </li>
              <li>
                <Link to="/products?category=Access Control" className="hover:text-cyan-500 transition">Access Control & Smart Locks</Link>
              </li>
              <li>
                <Link to="/products?category=CCTV Accessories" className="hover:text-cyan-500 transition">CCTV Accessories</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Exact Dindigul Location */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-black text-sm mb-3 border-l-2 border-cyan-500 pl-2.5">
              Store Address & Contact
            </h4>
            <ul className="space-y-2.5 text-xs font-normal">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <a 
                  href={mapLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white transition leading-relaxed underline-offset-2 hover:underline"
                >
                  Lucky Communication, {dindigulAddress}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition font-bold text-emerald-400">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href="mailto:luckycommunication@gmail.com" className="hover:text-white transition">luckycommunication@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Neat & Simple Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold">
          <p>© 2026 Lucky Communication, Dindigul. All Rights Reserved.</p>
          <div className="flex items-center gap-5">
            <a 
              href={mapLink} 
              target="_blank" 
              rel="noreferrer" 
              className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition font-bold"
            >
              <Navigation className="w-3.5 h-3.5" /> Get Directions
            </a>
            <Link 
              to="/admin/login" 
              className="text-slate-500 hover:text-slate-300 flex items-center gap-1 transition"
            >
              <Lock className="w-3 h-3" /> Admin Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
