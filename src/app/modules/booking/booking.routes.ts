import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { bookingValidation } from './booking.validationSchema';
import { bookingControllers } from './booking.controllers';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/auth.constant';

const router = Router();

router.post(
  '/create',
  validateRequest(bookingValidation.bookingValidationSchema),
  bookingControllers.createBooking,
);

///paymentVerify
router.get('/', auth(USER_ROLE.student), bookingControllers.verifyPament);

router.get(
  '/get',

  bookingControllers.getBooking,
);
router.get('/get/:id', bookingControllers.getSingleBooking);
router.patch(
  '/update/:id',
  validateRequest(bookingValidation.bookingValidationSchema),
  bookingControllers.updateBooking,
);
router.delete(
  '/update/:id',

  bookingControllers.deleteBooking,
);

export const bookingRoutes = router;
