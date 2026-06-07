import React, { useState, useEffect } from 'react';
import { User, Satellite, Thermometer, Globe, LogOut, CreditCard, ArrowUpCircle, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';
import TokenWidget from '../ui/TokenWidget';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { auth } from '../../lib/firebaseAuth';
import { signOut } from 'firebase/auth';

const MinimalistHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState({ ip: '...', temp: '...', time: '' });
  const [satellites, setSatellites] = useState({ active: 3, total: 3 });

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(d => setData(prev => ({ ...prev, ip: d.ip })))
      .catch(() => setData(prev => ({ ...prev, ip: '127.0.0.1' })));

    fetch('https://api.open-meteo.com/v1/forecast?latitude=48.85&longitude=2.35&current_weather=true')
      .then(res => res.json())
      .then(d => setData(prev => ({ ...prev, temp: `${Math.round(d.current_weather.temperature)}°C` })))
      .catch(() => setData(prev => ({ ...prev, temp: '--°C' })));

    const timer = setInterval(() => {
      setData(prev => ({ ...prev, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) }));
    }, 1000);
    const satTimer = setInterval(() => {
      setSatellites({ active: Math.floor(Math.random() * 2) + 2, total: 3 });
    }, 10000);
    return () => { clearInterval(timer); clearInterval(satTimer); };
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <header className="h-12 w-full bg-[#0f172a] dark:bg-[#0f172a] light-bg-header border-b border-white/10 dark:border-white/10 light-border-header flex items-center justify-between px-4 text-slate-400 text-[11px] font-medium tracking-tight shrink-0 z-50">
      {/* LEFT: Brand */}
      <div className="flex items-center gap-3">
        <div className="bg-[#c25a3d] text-white font-bold px-2 py-0.5 rounded text-xs">AM</div>
        <span className="text-slate-200 dark:text-slate-200 light-text-header font-semibold tracking-wide">AGROMAITRE</span>
      </div>

      {/* CENTER: Live Data Stream */}
      <div className="hidden md:flex items-center gap-6 border-x border-white/10 px-6 h-full">
        <div className="flex items-center gap-2">
          <Globe size={12} className="text-blue-400" />
          <span>IP: <span className="text-slate-200">{data.ip}</span></span>
        </div>
        <div className="flex items-center gap-2">
          <Thermometer size={12} className="text-orange-400" />
          <span>{data.temp}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-200 font-mono">{data.time}</span>
        </div>
      </div>

      {/* RIGHT: Controls */}
      <div className="flex items-center gap-3">
        <TokenWidget />
        <LanguageSwitcher />
        <ThemeToggle />

        <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-full border border-white/10">
          <Satellite size={12} className="text-purple-400" />
          <span className="hidden sm:inline">{t('header.satellites')}: </span>
          <span className="text-slate-200 font-bold">{satellites.active}/{satellites.total}</span>
        </div>

        {/* Profile Dropdown */}
        <div className="relative group cursor-pointer z-50">
          <div className="w-7 h-7 rounded-full bg-slate-700 border border-white/20 flex items-center justify-center overflow-hidden">
            <User size={16} className="text-slate-300" />
          </div>
          <div className="absolute right-0 top-full mt-2 w-52 bg-[#1e293b] border border-white/10 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all translate-y-2 group-hover:translate-y-0 p-2">
            <div className="px-3 py-2 text-xs font-bold text-slate-400 border-b border-white/10 mb-1">{t('nav.myAccount')}</div>
            <button className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:bg-white/5 rounded-lg" onClick={() => navigate('/billing')}>
              <CreditCard size={12} /> {t('nav.billing')}
            </button>
            <button className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:bg-white/5 rounded-lg" onClick={() => navigate('/upgrade')}>
              <ArrowUpCircle size={12} /> {t('nav.upgrade')}
            </button>
            <button className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:bg-white/5 rounded-lg" onClick={() => navigate('/team')}>
              <Users size={12} /> {t('nav.team')}
            </button>
            <button className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-lg" onClick={handleLogout}>
              <LogOut size={12} /> {t('nav.logout')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MinimalistHeader;
