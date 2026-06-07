import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ShieldCheck, Cpu, Brain, Eye, TrendingUp, Link as LinkIcon, 
  LayoutDashboard, Database, Settings, Leaf, Users, Mail, CreditCard
} from 'lucide-react';

const RightSidebar = () => {
  const { t } = useTranslation();

  return (
    <aside className="w-16 h-full bg-[#0f172a] border-l border-white/10 flex flex-col items-center py-4 gap-3 z-50 shrink-0 overflow-y-auto scrollbar-none">
      
      <SidebarLink to="/portails" icon={<Leaf size={18}/>} label={t('nav.portals')} />
      <SidebarLink to="/modules" icon={<Database size={18}/>} label={t('nav.modules')} />
      <SidebarLink to="/dashboard" icon={<ShieldCheck size={18}/>} label={t('nav.dashboard')} />
      <SidebarLink to="/infra" icon={<Cpu size={18}/>} label={t('nav.infra')} />
      <SidebarLink to="/logs" icon={<LayoutDashboard size={18}/>} label={t('nav.logs')} />
      
      <div className="w-8 h-px bg-white/10 my-0.5" />
      
      <SidebarLink to="/agro-brain" icon={<Brain size={18}/>} label="Agro Brain" />
      <SidebarLink to="/vision" icon={<Eye size={18}/>} label={t('nav.vision')} />
      <SidebarLink to="/finance" icon={<TrendingUp size={18}/>} label={t('nav.finance')} />
      <SidebarLink to="/traceability" icon={<LinkIcon size={18}/>} label={t('nav.traceability')} />
      
      <div className="w-8 h-px bg-white/10 my-0.5" />
      
      <SidebarLink to="/team" icon={<Users size={18}/>} label={t('nav.team')} />
      <SidebarLink to="/reports" icon={<Mail size={18}/>} label={t('nav.reports')} />
      <SidebarLink to="/billing" icon={<CreditCard size={18}/>} label={t('nav.billing')} />
      
      <div className="w-8 h-px bg-white/10 my-0.5" />
      <SidebarLink to="/settings" icon={<Settings size={18}/>} label={t('nav.settings')} />
      
    </aside>
  );
};

const SidebarLink = ({ to, icon, label }: { to: string, icon: any, label: string }) => (
  <div className="relative group">
    <NavLink 
      to={to}
      className={({ isActive }) => `block p-3 rounded-xl transition-all duration-200 ${
        isActive 
        ? 'bg-accent text-white shadow-lg shadow-accent/20' 
        : 'text-slate-500 hover:bg-white/5 hover:text-slate-200'
      }`}
    >
      {icon}
    </NavLink>
    
    {/* Tooltip on the left of the right sidebar */}
    <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap border border-white/10 z-50">
      {label}
    </div>
  </div>
);

export default RightSidebar;
