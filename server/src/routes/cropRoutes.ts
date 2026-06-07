import { Router } from 'express';
import prisma from '../utils/prisma';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const crops = await prisma.cropKnowledge.findMany();
    res.json(crops);
  } catch (err) {
    next(err);
  }
});

export default router;
