import express from 'express';
import {
  addOrderItems,
  getOrederByid,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrederByid);

export default router;
