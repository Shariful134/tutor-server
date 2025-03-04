import { Router } from 'express';

import { authRoutes } from '../modules/auth/auth.routes';
import { userRoutes } from '../modules/user/user.routes';
import { tutorRoutes } from '../modules/tutor/tutor.routes';
import { studentRoutes } from '../modules/student/student.routes';
import { bookingRoutes } from '../modules/booking/booking.routes';
import { reviewRoutes } from '../modules/review/review.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/tutors',
    route: tutorRoutes,
  },
  {
    path: '/students',
    route: studentRoutes,
  },
  {
    path: '/bookings',
    route: bookingRoutes,
  },
  {
    path: '/reviews-comment',
    route: reviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
