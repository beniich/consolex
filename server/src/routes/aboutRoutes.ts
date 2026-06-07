import { Router } from 'express';
import path from 'path';
import fs from 'fs';

const router = Router();

router.get('/', (_req, res) => {
  try {
    const filePath = path.join(__dirname, '../../../content/about.md');
    const content = fs.readFileSync(filePath, 'utf8');
    res.json({ content });
  } catch {
    res.json({ content: '# About AgroMaître\n\nPrecision Agriculture 4.0 platform.' });
  }
});

export default router;
