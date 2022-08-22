import express from 'express';
import { autoUser, getUserProfile } from '..//controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', autoUser);
router.route('/profile').get(protect, getUserProfile);

export default router;
