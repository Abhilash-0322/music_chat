import {Router} from 'express';
import {getAdmin,createSong} from '../controllers/admin.controller.js';
import { protectedRoute, requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/',getAdmin);

router.post('/songs',protectedRoute,requireAdmin,createSong);

export default router;