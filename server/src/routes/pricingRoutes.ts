import { Router } from 'express';
import path from 'path';
import fs from 'fs';

const router = Router();

router.get('/', (_req, res) => {
  try {
    const filePath = path.join(__dirname, '../../../content/pricing.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.json(data);
  } catch {
    // fallback inline data
    res.json([
      { id: 'free', name: 'Starter', monthlyPrice: 0, annualPrice: 0, description: 'Perfect for small farms.', features: ['2 sensor zones', 'Basic dashboard', '7-day history', '1 user'], color: '#64748b', icon: 'leaf' },
      { id: 'pro', name: 'Pro', monthlyPrice: 49, annualPrice: 470, description: 'For growing operations.', features: ['20 sensor zones', 'AI predictions', '1-year history', '5 team members', 'Automated reports'], popular: true, color: '#c25a3d', icon: 'zap' },
      { id: 'elite', name: 'Enterprise', monthlyPrice: 149, annualPrice: 1430, description: 'Enterprise-grade platform.', features: ['Unlimited zones', 'Full AI & Vision', 'Unlimited history', 'Unlimited team', 'Custom API', 'ISO 27001 reports'], color: '#7c3aed', icon: 'crown' }
    ]);
  }
});

export default router;
