import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function PricingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [farmSize, setFarmSize] = useState(250);

  const handleSelectPlan = (planId: string) => {
    localStorage.setItem('selected_plan', planId);
    navigate('/register');
  };

  const animals = farmSize * 2;

  return (
    <div className="min-h-screen font-['Plus_Jakarta_Sans',sans-serif] bg-[#fdfbf9] text-slate-800">
      
      {/* SECTION 1: INTERACTIVE CALCULATOR */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{t('pricing.interactiveTitle', 'Interactive Farm Size Pricing Calculator')}</h1>
          <p className="text-slate-500">{t('pricing.interactiveSub', 'Adjust your farm size to see the best plan for your needs.')}</p>
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Background Glow */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-200 rounded-full blur-[120px] opacity-50"></div>
          
          <div className="bg-white/80 backdrop-blur-md border border-white/30 rounded-[40px] p-12 shadow-2xl flex flex-col md:flex-row items-center gap-12 relative z-10">
            {/* Left: Slider */}
            <div className="flex-1 w-full space-y-8">
              <div className="text-center md:text-left">
                <span className="text-3xl font-bold text-slate-800">{farmSize} Hectares / {animals} Animals</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="1000" 
                value={farmSize} 
                onChange={(e) => setFarmSize(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#c25a3d]"
                style={{ accentColor: '#c25a3d' }}
              />
              <p className="text-center md:text-left text-sm text-slate-400 font-medium">{t('pricing.selectSize', 'Select Farm Size')}</p>
            </div>

            {/* Right: Plan Cards */}
            <div className="flex gap-4 w-full md:w-auto">
              {/* Essential */}
              <div className="flex-1 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm w-full md:w-48 text-center flex flex-col">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">{t('pricing.essentialPlan', 'Essential Plan')}</h4>
                <p className="text-xl font-bold mb-4">€299<span className="text-xs text-slate-400 font-normal">/mo</span></p>
                <ul className="text-[10px] text-slate-500 space-y-2 text-left flex-1 mb-4">
                  <li>• Basic Monitoring</li>
                  <li>• Crop Planning</li>
                  <li>• Email Support</li>
                </ul>
                <button onClick={() => handleSelectPlan('free')} className="w-full text-xs py-2 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition">Select</button>
              </div>
              {/* Professional (Highlighted) */}
              <div className="flex-1 bg-white p-6 rounded-3xl border-2 border-[#c25a3d] shadow-xl w-full md:w-56 text-center scale-105 relative z-10 flex flex-col">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c25a3d] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">{t('pricing.recommended', 'Recommended')}</div>
                <h4 className="text-xs font-bold text-[#c25a3d] uppercase mb-2">{t('pricing.professionalPlan', 'Professional Plan')}</h4>
                <p className="text-2xl font-bold mb-4">€599<span className="text-xs text-slate-400 font-normal">/mo</span></p>
                <ul className="text-[10px] text-slate-600 space-y-2 text-left font-medium flex-1 mb-4">
                  <li>• Advanced Analytics</li>
                  <li>• Yield Prediction</li>
                  <li>• Priority Support</li>
                  <li>• Integration API</li>
                </ul>
                <button onClick={() => handleSelectPlan('pro')} className="w-full text-xs py-2 rounded-xl bg-[#c25a3d] text-white font-bold hover:bg-orange-700 transition">Select</button>
              </div>
              {/* Enterprise */}
              <div className="flex-1 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm w-full md:w-48 text-center flex flex-col">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">{t('pricing.enterprisePlan', 'Enterprise Plan')}</h4>
                <p className="text-xl font-bold mb-4">{t('pricing.contactUs', 'Contact Us')}</p>
                <ul className="text-[10px] text-slate-500 space-y-2 text-left flex-1 mb-4">
                  <li>• Custom AI Models</li>
                  <li>• Dedicated Account Mgr</li>
                  <li>• Full Suite Access</li>
                  <li>• On-site Training</li>
                </ul>
                <button onClick={() => handleSelectPlan('elite')} className="w-full text-xs py-2 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition">Contact</button>
              </div>
            </div>
          </div>
        </div>

        {/* Add-ons Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <h3 className="text-center text-xl font-bold text-slate-800 mb-10">{t('pricing.addons', 'Enhance Your Platform with Add-ons')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Add-on 1 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex justify-between items-center">
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800">AI Agent Premium</h4>
                <p className="text-xs text-slate-500">Predictive insights and automated recommendations.</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-[#c25a3d]">+€149/mo</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c25a3d]"></div>
                </label>
              </div>
            </div>
            {/* Add-on 2 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex justify-between items-center">
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800">IoT Telemetry Integration</h4>
                <p className="text-xs text-slate-500">Connect sensors for real-time data streams.</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-[#c25a3d]">+€99/mo</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c25a3d]"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TRADITIONAL PRICING TABLE */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">{t('pricing.traditionalTitle', 'AgroMaître Subscription Plans & Pricing')}</h2>
            <p className="text-slate-500">{t('pricing.traditionalSub', 'High-tech SaaS for agricultural management. Choose the plan that fits your farm.')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Seed Plan */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
              <h3 className="text-lg font-bold text-slate-800 mb-1">Seed <span className="text-slate-400 font-normal">(Free/Starter)</span></h3>
              <p className="text-3xl font-black text-slate-900 mb-6">$0<span className="text-sm font-normal text-slate-500">/month</span></p>
              <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-center gap-3 text-sm text-slate-600"><span className="text-green-500">✓</span> Basic Crop Planning</li>
                <li className="flex items-center gap-3 text-sm text-slate-600"><span class="text-green-500">✓</span> Data Storage (Limited)</li>
                <li className="flex items-center gap-3 text-sm text-slate-600"><span className="text-green-500">✓</span> Community Support</li>
                <li className="flex items-center gap-3 text-sm text-slate-600"><span className="text-green-500">✓</span> Weekly Reports</li>
              </ul>
              <button onClick={() => handleSelectPlan('free')} className="w-full py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition">Select Plan</button>
            </div>
            {/* Grow Plan */}
            <div className="bg-white p-8 rounded-3xl border-2 border-[#c25a3d] shadow-xl flex flex-col scale-105 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c25a3d] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">Most Popular</div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">Grow <span className="text-slate-400 font-normal">(Professional)</span></h3>
              <p className="text-3xl font-black text-slate-900 mb-6">$99<span className="text-sm font-normal text-slate-500">/month</span></p>
              <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-center gap-3 text-sm text-slate-600"><span className="text-green-500">✓</span> Advanced Crop Planning</li>
                <li className="flex items-center gap-3 text-sm text-slate-600"><span className="text-green-500">✓</span> Unlimited Data Storage</li>
                <li className="flex items-center gap-3 text-sm text-slate-600"><span className="text-green-500">✓</span> Priority Chat Support</li>
                <li className="flex items-center gap-3 text-sm text-slate-600"><span className="text-green-500">✓</span> Daily Analytics</li>
                <li className="flex items-center gap-3 text-sm text-slate-600"><span className="text-green-500">✓</span> Weather Integration</li>
                <li className="flex items-center gap-3 text-sm text-slate-600"><span className="text-green-500">✓</span> IoT Connectivity (5)</li>
                <li className="flex items-center gap-3 text-sm text-slate-600"><span className="text-green-500">✓</span> Customizable Dashboards</li>
              </ul>
              <button onClick={() => handleSelectPlan('pro')} className="w-full py-3 rounded-xl bg-[#c25a3d] text-white font-bold hover:bg-orange-700 transition shadow-lg">Select Plan</button>
            </div>
            {/* Harvest Plan */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
              <h3 className="text-lg font-bold text-slate-800 mb-1">Harvest <span className="text-slate-400 font-normal">(Enterprise)</span></h3>
              <p className="text-3xl font-black text-slate-900 mb-6">$249<span className="text-sm font-normal text-slate-500">/month</span></p>
              <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-center gap-3 text-sm text-slate-600"><span className="text-green-500">✓</span> Full Resource Management</li>
                <li className="flex items-center gap-3 text-sm text-slate-600"><span className="text-green-500">✓</span> Dedicated Account Manager</li>
                <li className="flex items-center gap-3 text-sm text-slate-600"><span className="text-green-500">✓</span> 24/7 Premium Support</li>
                <li className="flex items-center gap-3 text-sm text-slate-600"><span className="text-green-500">✓</span> Real-time Analytics</li>
                <li className="flex items-center gap-3 text-sm text-slate-600"><span className="text-green-500">✓</span> Unlimited IoT Devices</li>
                <li className="flex items-center gap-3 text-sm text-slate-600"><span className="text-green-500">✓</span> White-label Option</li>
                <li className="flex items-center gap-3 text-sm text-slate-600"><span className="text-green-500">✓</span> Custom API Access</li>
              </ul>
              <button onClick={() => handleSelectPlan('elite')} className="w-full py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition">Select Plan</button>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-center font-bold text-slate-800">Compare All Features</h3>
            </div>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                  <th className="px-6 py-4">Features</th>
                  <th className="px-6 py-4 text-center">Seed</th>
                  <th className="px-6 py-4 text-center">Grow</th>
                  <th className="px-6 py-4 text-center">Harvest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 text-slate-600">Crop Planning</td>
                  <td className="px-6 py-4 text-center text-green-500">✓</td>
                  <td className="px-6 py-4 text-center text-green-500">✓</td>
                  <td className="px-6 py-4 text-center text-green-500">✓</td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 text-slate-600">Data Storage</td>
                  <td className="px-6 py-4 text-center text-slate-300">✕</td>
                  <td className="px-6 py-4 text-center text-green-500">✓</td>
                  <td className="px-6 py-4 text-center text-green-500">✓</td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 text-slate-600">Support</td>
                  <td className="px-6 py-4 text-center text-slate-300">Community</td>
                  <td className="px-6 py-4 text-center text-green-500">Priority</td>
                  <td className="px-6 py-4 text-center text-green-500">Premium</td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 text-slate-600">Analytics</td>
                  <td className="px-6 py-4 text-center text-slate-300">✕</td>
                  <td className="px-6 py-4 text-center text-green-500">✓</td>
                  <td className="px-6 py-4 text-center text-green-500">✓</td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 text-slate-600">Weather Integration</td>
                  <td className="px-6 py-4 text-center text-slate-300">✕</td>
                  <td className="px-6 py-4 text-center text-green-500">✓</td>
                  <td className="px-6 py-4 text-center text-green-500">✓</td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 text-slate-600">IoT Devices</td>
                  <td className="px-6 py-4 text-center text-slate-300">✕</td>
                  <td className="px-6 py-4 text-center text-green-500">5</td>
                  <td className="px-6 py-4 text-center text-green-500">Unlimited</td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 text-slate-600">Customization</td>
                  <td className="px-6 py-4 text-center text-slate-300">✕</td>
                  <td className="px-6 py-4 text-center text-green-500">✓</td>
                  <td className="px-6 py-4 text-center text-green-500">✓</td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 text-slate-600">API Access</td>
                  <td className="px-6 py-4 text-center text-slate-300">✕</td>
                  <td className="px-6 py-4 text-center text-slate-300">✕</td>
                  <td className="px-6 py-4 text-center text-green-500">✓</td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 text-slate-600">Account Manager</td>
                  <td className="px-6 py-4 text-center text-slate-300">✕</td>
                  <td className="px-6 py-4 text-center text-slate-300">✕</td>
                  <td className="px-6 py-4 text-center text-green-500">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
