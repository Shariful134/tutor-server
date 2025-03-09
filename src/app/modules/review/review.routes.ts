import { Router } from 'express';
import { reviewControllers } from './review.controllers';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/auth.constant';

const router = Router();

router.post('/create', auth(USER_ROLE.student), reviewControllers.createReview);
router.get('/get', reviewControllers.getReview);
router.get('/get/:id', reviewControllers.getSingleReview);
router.patch(
  '/update/:id',
  auth(USER_ROLE.student),
  reviewControllers.updateReview,
);
router.delete(
  '/delete/:id',
  auth(USER_ROLE.student, USER_ROLE.admin),
  reviewControllers.deleteReview,
);

export const reviewRoutes = router;
