import {Router} from 'express';
import {getAdmin,createSong,deleteSong, createAlbum, deleteAlbum, checkAdmin} from '../controllers/admin.controller.js';
import { protectedRoute, requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

//slightly optimized version
router.use(protectedRoute,requireAdmin);

router.get('/',getAdmin);
router.get('/check',checkAdmin);

router.post('/songs',createSong);
router.delete('/songs/:id',deleteSong);

router.post('/albums',createAlbum);
router.delete('/albums/:id',deleteAlbum);

export default router;