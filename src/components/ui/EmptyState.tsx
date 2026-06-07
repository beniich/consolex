import { LucideIcon, Database } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface EmptyStateProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export default function EmptyState({ icon: Icon = Database, title, description, action }: EmptyStateProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
        <Icon size={28} className="text-slate-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-300 mb-2">{title || t('common.noData')}</h3>
      <p className="text-slate-500 text-sm max-w-xs mb-6">{description || t('common.noDataDesc')}</p>
      {action && (
        <button onClick={action.onClick} className="bg-[#c25a3d] text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-all">
          {action.label}
        </button>
      )}
    </div>
  );
}
