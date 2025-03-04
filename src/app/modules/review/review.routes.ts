import { Router } from 'express';
import { reviewControllers } from './review.controllers';

const router = Router();

router.post('/create', reviewControllers.createReview);
router.get('/get', reviewControllers.getReview);
router.get('/get/:id', reviewControllers.getSingleReview);
router.patch('/update/:id', reviewControllers.updateReview);
router.delete('/delete/:id', reviewControllers.deleteReview);

export const reviewRoutes = router;
