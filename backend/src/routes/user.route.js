import {Router} from 'express';
import { protectedRoute } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', (req, res) => {
    res.send('User route');
});

router.get('/like',protectedRoute, (req, res) => {
    res.send('User like route');
});

export default router;