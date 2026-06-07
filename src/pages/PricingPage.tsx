import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Zap, Shield, Crown, ArrowRight, Leaf, Star } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  popular?: boolean;
  color: string;
  icon: string;
  ctaLabel?: string;
}

const FALLBACK_PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Starter',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'Perfect for small farms getting started with precision agriculture.',
    features: [
      'Up to 2 sensor zones',
      'Basic dashboard & analytics',
      '7-day data history',
      '1 user account',
      'Email support',
    ],
    color: '#64748b',
    icon: 'leaf',
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 49,
    annualPrice: 470,
    description: 'For growing operations that need advanced monitoring and AI insights.',
    features: [
      'Up to 20 sensor zones',
      'Advanced AI predictions',
      '1-year data history',
      'Up to 5 team members',
      'IoT real-time monitoring',
      'Automated reports',
      'Priority support',
    ],
    popular: true,
    color: '#c25a3d',
    icon: 'zap',
  },
  {
    id: 'elite',
    name: 'Enterprise',
    monthlyPrice: 149,
    annualPrice: 1430,
    description: 'Enterprise-grade platform for large agricultural operations and agribusinesses.',
    features: [
      'Unlimited sensor zones',
      'Full AI & Vision suite',
      'Unlimited data history',
      'Unlimited team members',
      'Custom integrations & API',
      'ISO 27001 compliance reports',
      'Dedicated account manager',
      'SLA 99.9% uptime guarantee',
    ],
    color: '#7c3aed',
    icon: 'crown',
  },
];

export default function PricingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>(FALLBACK_PLANS);
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Try to fetch from backend, fallback to static data
    fetch('/api/pricing')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setPlans(data); })
      .catch(() => {/* use fallback */});
  }, []);

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'zap': return <Zap size={20} className="text-white" />;
      case 'crown': return <Crown size={20} className="text-white" />;
      default: return <Leaf size={20} className="text-white" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbf9] to-[#f5f0eb] dark:from-[#051424] dark:to-[#0d2035]">
      {/* Hero */}
      <div className="pt-20 pb-16 text-center px-4">
        <div className="inline-flex items-center gap-2 bg-[#c25a3d]/10 text-[#c25a3d] px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-[#c25a3d]/20">
          <Star size={14} /> ISO 27001 & SOC 2 Compliant
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] dark:text-white mb-4">
          {t('pricing.title')}
        </h1>
        <p className="text-lg text-[#64748b] dark:text-slate-400 max-w-2xl mx-auto mb-10">
          {t('pricing.subtitle')}
        </p>

        {/* Billing toggle */}
        <div className="inline-flex bg-[#f0ebe5] dark:bg-white/5 rounded-xl p-1 border border-[#e2d8d0] dark:border-white/10">
          <button onClick={() => setBilling('monthly')}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              billing === 'monthly' ? 'bg-white dark:bg-white/10 text-[#0f172a] dark:text-white shadow-sm' : 'text-[#64748b] dark:text-slate-400'
            }`}>{t('pricing.monthly')}</button>
          <button onClick={() => setBilling('annual')}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              billing === 'annual' ? 'bg-white dark:bg-white/10 text-[#0f172a] dark:text-white shadow-sm' : 'text-[#64748b] dark:text-slate-400'
            }`}>
            {t('pricing.annual')}
            <span className="bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-[10px] px-2 py-0.5 rounded-full font-semibold">{t('pricing.save')}</span>
          </button>
        </div>
      </div>

      {/* Plans */}
      <div className="max-w-6xl mx-auto px-4 pb-24 grid md:grid-cols-3 gap-8 items-start">
        {plans.map((plan) => (
          <div key={plan.id} className={`relative rounded-2xl border ${
            plan.popular
              ? 'bg-white dark:bg-[#1a2a3a] border-[#c25a3d]/40 shadow-2xl shadow-[#c25a3d]/10 scale-105'
              : 'bg-white/80 dark:bg-[#0d1c2d] border-[#e2d8d0] dark:border-white/10'
          } p-8 flex flex-col gap-6 transition-all hover:shadow-xl`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#c25a3d] to-[#e2725b] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                {t('pricing.popular')}
              </div>
            )}

            <div className="flex items-start justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: plan.color }}>
                  {getIcon(plan.icon)}
                </div>
                <h2 className="text-xl font-bold text-[#0f172a] dark:text-white">{plan.name}</h2>
                <p className="text-sm text-[#64748b] dark:text-slate-400 mt-1">{plan.description}</p>
              </div>
            </div>

            <div>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-extrabold text-[#0f172a] dark:text-white">
                  {billing === 'monthly' ? (plan.monthlyPrice === 0 ? 'Free' : `€${plan.monthlyPrice}`) : `€${plan.annualPrice}`}
                </span>
                {plan.monthlyPrice > 0 && (
                  <span className="text-[#64748b] dark:text-slate-400 mb-1 text-sm">
                    {billing === 'monthly' ? t('pricing.perMonth') : t('pricing.perYear')}
                  </span>
                )}
              </div>
              {billing === 'annual' && plan.monthlyPrice > 0 && (
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  (€{Math.round(plan.annualPrice / 12)}/month billed annually)
                </p>
              )}
            </div>

            <ul className="space-y-3 flex-1">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[#374151] dark:text-slate-300">
                  <CheckCircle size={15} className="mt-0.5 shrink-0" style={{ color: plan.color }} />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => {
                localStorage.setItem('selected_plan', plan.id);
                navigate('/register');
              }}
              className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                plan.popular
                  ? 'bg-gradient-to-r from-[#c25a3d] to-[#e2725b] text-white hover:opacity-90 shadow-lg shadow-[#c25a3d]/25'
                  : 'border-2 text-[#374151] dark:text-slate-200 hover:bg-[#f5f0eb] dark:hover:bg-white/5'
              }`}
              style={{ borderColor: !plan.popular ? plan.color : undefined }}>
              {plan.id === 'elite' ? t('pricing.contactSales') : t('pricing.getStarted')}
              <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="text-center pb-16 text-sm text-[#64748b] dark:text-slate-500">
        <Shield size={14} className="inline mr-1" /> All plans include SSL encryption, GDPR compliance, and 99.9% uptime SLA.
      </div>
    </div>
  );
}
