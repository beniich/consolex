import { NavLink } from 'react-router-dom';
import { Award, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface NavbarProps {
  onSocBadgeClick: () => void;
}

export function Navbar({ onSocBadgeClick }: NavbarProps) {
  const { t } = useTranslation();

  const navLinks = [
    { to: '/portails', label: t('nav.portals'), emoji: '🌾' },
    { to: '/modules', label: t('nav.modules'), emoji: null },
    { to: '/dashboard', label: t('nav.dashboard'), emoji: null },
    { to: '/infra', label: t('nav.infra'), emoji: null },
    { to: '/logs', label: t('nav.logs'), emoji: null },
    { to: '/settings', label: t('nav.settings'), emoji: null },
    { to: '/pricing', label: t('nav.pricing') || 'Pricing', emoji: null },
    { to: '/about', label: t('nav.about') || 'About', emoji: null },
  ];

  return (
    <nav
      className="flex flex-row justify-between items-center mb-6 border-b border-slate-800 dark:border-white/10 pb-2 gap-2 text-[10px]"
      id="main-nav"
    >
      {/* Brand identity */}
      <div className="flex items-center gap-1.5 shrink-0">
        <div className="w-5 h-5 bg-[#c25a3d] rounded-xs flex items-center justify-center text-white font-bold font-mono text-[9px] tracking-tight shadow-sm select-none">
          AM
        </div>
        <span className="text-[11px] font-bold tracking-tight uppercase font-mono hidden xs:inline text-slate-800 dark:text-white">
          Agro<span className="text-[#c25a3d]">Maître</span>
        </span>
      </div>

      {/* Navigation links */}
      <div className="flex flex-wrap items-center justify-center gap-1 text-[9.5px] font-semibold uppercase font-mono bg-white/5 dark:bg-[#0c1825]/80 border border-slate-200 dark:border-slate-800/80 p-0.5 rounded-xs shrink-1 max-w-full">
        {navLinks.map(({ to, label, emoji }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              [
                'px-1.5 py-0.5 rounded-xs transition-all pointer-events-auto cursor-pointer flex items-center gap-0.5',
                isActive
                  ? 'bg-slate-100 dark:bg-[#122131] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-bold'
                  : 'text-slate-500 dark:text-[#c5c6cd] hover:text-slate-800 dark:hover:text-white',
              ].join(' ')
            }
          >
            {emoji && <span>{emoji}</span>}
            {label}
          </NavLink>
        ))}
      </div>

      {/* Right section: SOC badge + avatar */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={onSocBadgeClick}
          className="text-[8.5px] font-mono bg-white/5 dark:bg-[#0a192f] px-1.5 py-0.5 border border-slate-300 dark:border-[#334155] text-slate-600 dark:text-[#4de082] rounded-xs hover:border-[#c25a3d] dark:hover:border-[#4de082] transition active:scale-95 cursor-pointer flex items-center gap-0.5"
          id="soc-compliance-badge"
        >
          <ShieldCheck className="w-2.5 h-2.5 text-[#c25a3d] dark:text-[#4de082]" />
          <span className="hidden sm:inline">ISO 27001 & SOC 2</span>
          <span className="sm:hidden text-[7.5px]">SECURE</span>
        </button>

        <div
          className="w-5 h-5 rounded-full bg-slate-200 dark:bg-[#1c2b3c] border border-slate-300 dark:border-slate-700 flex items-center justify-center font-mono text-[9px] text-slate-700 dark:text-white uppercase font-bold select-none cursor-help"
          title="Identity: Security Administrator // adambeniich7@gmail.com"
          id="admin-avatar"
        >
          AB
        </div>
      </div>
    </nav>
  );
}
