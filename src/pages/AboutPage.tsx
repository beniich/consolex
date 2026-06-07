import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Leaf, Shield, Zap, Globe, Users, Award, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ABOUT_CONTENT = {
  mission: "AgroMaître was founded to bridge the gap between traditional farming and modern technology. We believe every farmer — from a small family operation to a large agribusiness — deserves access to enterprise-grade precision agriculture tools.",
  vision: "Our vision is a world where every field, greenhouse, and livestock operation is intelligently monitored, sustainably managed, and economically optimized through the power of AI, IoT, and data analytics.",
  stats: [
    { label: 'Farms managed', value: '2,400+' },
    { label: 'Sensor data points / day', value: '18M+' },
    { label: 'Countries', value: '34' },
    { label: 'Uptime SLA', value: '99.9%' },
  ],
  values: [
    { icon: Shield, title: 'Security First', desc: 'ISO 27001 and SOC 2 compliant. Your data is yours — always encrypted, always private.' },
    { icon: Zap, title: 'Real-time Intelligence', desc: 'From soil moisture to satellite imagery, decisions happen in milliseconds with live IoT data streams.' },
    { icon: Globe, title: 'Sustainability', desc: 'Every optimization reduces water waste, chemical use, and carbon footprint — good for business, great for the planet.' },
    { icon: Users, title: 'Farmer-Centric', desc: 'Built with agronomists, not just engineers. Our UX is designed for the field, not a boardroom.' },
  ],
  team: [
    { name: 'Amara Benali', role: 'CEO & Co-founder', img: '👩‍💼' },
    { name: 'Karim Soltani', role: 'CTO & Co-founder', img: '👨‍💻' },
    { name: 'Sofia Reyes', role: 'Head of Agronomy', img: '👩‍🔬' },
    { name: 'Luca Ferrari', role: 'Head of Security', img: '🛡️' },
  ],
};

export default function AboutPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [dbMission, setDbMission] = useState('');

  useEffect(() => {
    fetch('/api/about')
      .then(r => r.json())
      .then(data => {
        if (data && data.content) {
          // Remove markdown headers to get the text paragraph
          const cleanText = data.content
            .replace(/#+\s+.+/g, '')
            .replace(/\n+/g, ' ')
            .trim();
          if (cleanText) setDbMission(cleanText);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbf9] to-[#f5f0eb] dark:from-[#051424] dark:to-[#0d2035]">
      {/* Hero */}
      <section className="pt-24 pb-20 text-center px-4">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c25a3d] to-[#e2725b] flex items-center justify-center shadow-xl shadow-[#c25a3d]/30">
            <Leaf size={28} className="text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-extrabold text-[#0f172a] dark:text-white mb-6">
          Agro<span className="text-[#c25a3d]">Maître</span>
        </h1>
        <p className="text-xl text-[#64748b] dark:text-slate-400 max-w-3xl mx-auto">{dbMission || ABOUT_CONTENT.mission}</p>
      </section>

      {/* Stats */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {ABOUT_CONTENT.stats.map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-[#0d1c2d] rounded-2xl p-6 text-center border border-[#e2d8d0] dark:border-white/10 shadow-sm">
              <div className="text-3xl font-extrabold text-[#c25a3d] mb-1">{stat.value}</div>
              <div className="text-xs text-[#64748b] dark:text-slate-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Vision */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="bg-gradient-to-br from-[#c25a3d] to-[#7c3aed] rounded-3xl p-10 text-white text-center shadow-2xl">
          <Award size={36} className="mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p className="text-white/80 text-lg leading-relaxed">{ABOUT_CONTENT.vision}</p>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold text-center text-[#0f172a] dark:text-white mb-12">Our Values</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {ABOUT_CONTENT.values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-5 bg-white dark:bg-[#0d1c2d] rounded-2xl p-6 border border-[#e2d8d0] dark:border-white/10 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#c25a3d]/10 flex items-center justify-center shrink-0">
                <Icon size={22} className="text-[#c25a3d]" />
              </div>
              <div>
                <h3 className="font-bold text-[#0f172a] dark:text-white mb-1">{title}</h3>
                <p className="text-sm text-[#64748b] dark:text-slate-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold text-center text-[#0f172a] dark:text-white mb-12">Meet the Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {ABOUT_CONTENT.team.map((member) => (
            <div key={member.name} className="bg-white dark:bg-[#0d1c2d] rounded-2xl p-6 text-center border border-[#e2d8d0] dark:border-white/10 shadow-sm">
              <div className="text-4xl mb-3">{member.img}</div>
              <div className="font-semibold text-[#0f172a] dark:text-white text-sm">{member.name}</div>
              <div className="text-xs text-[#c25a3d] mt-1">{member.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-4 pb-24 text-center">
        <h2 className="text-2xl font-bold text-[#0f172a] dark:text-white mb-4">Ready to transform your operation?</h2>
        <p className="text-[#64748b] dark:text-slate-400 mb-8">Join 2,400+ farms already using AgroMaître to maximize yield and minimize risk.</p>
        <button onClick={() => navigate('/register')} className="bg-gradient-to-r from-[#c25a3d] to-[#e2725b] text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-all flex items-center gap-2 mx-auto shadow-lg shadow-[#c25a3d]/25">
          Get Started Free <ArrowRight size={18} />
        </button>
      </section>
    </div>
  );
}
