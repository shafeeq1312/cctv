import React from 'react';
import { Camera, Fingerprint, HardDrive, KeyRound, Plug, Shield } from 'lucide-react';

const CategoryCard = ({ category, onClick, active }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Camera':
        return <Camera className="w-6 h-6 text-blue-400" />;
      case 'Fingerprint':
        return <Fingerprint className="w-6 h-6 text-emerald-400" />;
      case 'HardDrive':
        return <HardDrive className="w-6 h-6 text-purple-400" />;
      case 'KeyRound':
        return <KeyRound className="w-6 h-6 text-amber-400" />;
      case 'Plug':
        return <Plug className="w-6 h-6 text-rose-400" />;
      default:
        return <Shield className="w-6 h-6 text-blue-400" />;
    }
  };

  return (
    <button
      onClick={() => onClick(category.name)}
      className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${
        active
          ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/20'
          : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
      }`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
        active ? 'bg-blue-600 text-white' : 'bg-slate-900 border border-slate-700'
      }`}>
        {getIcon(category.icon)}
      </div>
      <div>
        <h4 className="font-bold text-white text-base">{category.name}</h4>
        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
          {category.description || 'Explore products'}
        </p>
      </div>
    </button>
  );
};

export default CategoryCard;
