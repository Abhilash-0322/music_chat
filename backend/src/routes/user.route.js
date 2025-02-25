import {Router} from 'express';
import { protectedRoute } from '../middleware/auth.middleware.js';
import { getAllUsers } from '../controllers/user.controller.js';

const router = Router();

router.get('/', protectedRoute,getAllUsers);
//todo: getMessages

router.get('/like',protectedRoute, (req, res) => {
    res.send('User like route');
});

export default router;