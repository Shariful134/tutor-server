import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { bookingValidation } from './booking.validationSchema';
import { bookingControllers } from './booking.controllers';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/auth.constant';

const router = Router();

//Rerquest booking
router.post(
  '/request-booking',
  auth(USER_ROLE.student),
  validateRequest(bookingValidation.bookingRequestValidationSchema),
  bookingControllers.createBookingRequest,
);

//Accept booking
router.patch(
  '/accept-booking/:id',
  auth(USER_ROLE.tutor),
  bookingControllers.acceptBookingRequest,
);

// create or booking confirm after accept by tutor
router.patch(
  '/create/:id',
  auth(USER_ROLE.student),
  validateRequest(bookingValidation.bookingValidationSchema),
  bookingControllers.createBooking,
);

///paymentVerify
router.get('/verify', auth(USER_ROLE.student), bookingControllers.verifyPament);

//get All Bookings
router.get(
  '/get',
  auth(USER_ROLE.student, USER_ROLE.tutor, USER_ROLE.admin),
  bookingControllers.getBooking,
);
router.get(
  '/get-allBookings',
  auth(USER_ROLE.student, USER_ROLE.tutor, USER_ROLE.admin),
  bookingControllers.getAllBooking,
);
router.get(
  '/get/:id',
  auth(USER_ROLE.student, USER_ROLE.tutor, USER_ROLE.admin),
  bookingControllers.getSingleBooking,
);

//update bookings
router.patch(
  '/update/:id',
  auth(USER_ROLE.student),
  validateRequest(bookingValidation.bookingUpadateValidationSchema),
  bookingControllers.updateBooking,
);
router.delete(
  '/delete-booking/:id',
  auth(USER_ROLE.student, USER_ROLE.tutor),
  bookingControllers.deleteBooking,
);

export const bookingRoutes = router;
