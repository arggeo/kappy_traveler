import { Router } from 'express';
const router = Router();

import requestLogger from '../middlewares/requestLogger.js';

import { get, getDefaultRoute } from '../controllers/sights.controller.js';

// Get sight based on cityName
router.get('/:cityName', requestLogger, get);

// Get top sights on default route
router.get('/', getDefaultRoute);

export default router;