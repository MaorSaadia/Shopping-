import express from 'express';
import {
  addOrderItems,
  getOrederByid,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrederByid);
router.route('/:id/pay').put(protect, updateOrderToPaid);
export default router;
