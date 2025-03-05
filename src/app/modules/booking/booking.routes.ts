import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { bookingValidation } from './booking.validationSchema';
import { bookingControllers } from './booking.controllers';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/auth.constant';

const router = Router();

router.post(
  '/create',
  auth(USER_ROLE.student),
  validateRequest(bookingValidation.bookingValidationSchema),
  bookingControllers.createBooking,
);

///paymentVerify
router.get('/', auth(USER_ROLE.student), bookingControllers.verifyPament);

router.get(
  '/get',
  auth(USER_ROLE.student, USER_ROLE.tutor, USER_ROLE.admin),
  bookingControllers.getBooking,
);
router.get(
  '/get/:id',
  auth(USER_ROLE.student, USER_ROLE.tutor, USER_ROLE.admin),
  bookingControllers.getSingleBooking,
);
router.patch(
  '/update/:id',
  auth(USER_ROLE.student),
  validateRequest(bookingValidation.bookingValidationSchema),
  bookingControllers.updateBooking,
);
router.delete(
  '/update/:id',
  auth(USER_ROLE.student),
  bookingControllers.deleteBooking,
);

export const bookingRoutes = router;
