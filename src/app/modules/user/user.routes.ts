import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
import { userControllers } from './user.controllers';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/auth.constant';

const router = Router();
//get all Users
router.get('/', userControllers.getAllUser);

router.get(
  '/profile',
  auth(USER_ROLE.admin, USER_ROLE.tutor, USER_ROLE.student),

  userControllers.updateUser,
);
router.patch(
  '/profile-update',
  auth(USER_ROLE.admin, USER_ROLE.tutor, USER_ROLE.student),
  validateRequest(userValidation.updateUserValidationSchema),
  userControllers.updateUser,
);

export const userRoutes = router;
