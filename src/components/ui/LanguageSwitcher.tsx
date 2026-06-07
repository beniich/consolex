import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const current = i18n.language.startsWith('fr') ? 'fr' : 'en';

  const toggle = () => {
    const next = current === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(next);
    localStorage.setItem('lang', next);
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-slate-300 text-[11px] font-semibold tracking-wide"
      aria-label="Switch language"
    >
      <Globe size={11} className="text-blue-400" />
      <span>{current.toUpperCase()}</span>
    </button>
  );
};

export default LanguageSwitcher;
