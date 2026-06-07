import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, RefreshCw, ArrowRight, Leaf, CheckCircle } from 'lucide-react';
import { resendVerification, auth } from '../lib/firebaseAuth';

import { useStore } from '../store/useStore';

export default function VerifyEmailPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [resent, setResent] = useState(false);
  const [checking, setChecking] = useState(false);

  const handleResend = async () => {
    await resendVerification();
    setResent(true);
    setTimeout(() => setResent(false), 5000);
  };

  const handleContinue = async () => {
    setChecking(true);
    await auth.currentUser?.reload();
    if (auth.currentUser?.emailVerified) {
      const selectedPlan = localStorage.getItem('selected_plan');
      if (selectedPlan) {
        useStore.getState().setSubscription({ plan: selectedPlan as any });
      }
      navigate('/dashboard');
    } else {
      alert('Email not yet verified. Please check your inbox.');
    }
    setChecking(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#051424] via-[#0d2035] to-[#122131] flex items-center justify-center p-4">
      <div className="w-full max-w-sm text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#c25a3d] flex items-center justify-center">
            <Leaf size={20} className="text-white" />
          </div>
          <div className="text-xl font-bold text-white">Agro<span className="text-[#c25a3d]">Maître</span></div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
            <Mail size={28} className="text-blue-400" />
          </div>
          <h1 className="text-xl font-bold text-white mb-2">{t('auth.verifyEmailTitle')}</h1>
          <p className="text-slate-400 text-sm mb-6">{t('auth.verifyEmailDesc')}</p>

          {resent && (
            <div className="flex items-center justify-center gap-2 text-green-400 text-sm mb-4">
              <CheckCircle size={14} /> Email sent!
            </div>
          )}

          <div className="space-y-3">
            <button onClick={handleContinue} disabled={checking}
              className="w-full bg-gradient-to-r from-[#c25a3d] to-[#e2725b] text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
              {checking ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><ArrowRight size={16} /> {t('auth.continueToApp')}</>}
            </button>
            <button onClick={handleResend}
              className="w-full border border-white/10 text-slate-300 text-sm py-3 rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-2">
              <RefreshCw size={14} /> {t('auth.resendEmail')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
