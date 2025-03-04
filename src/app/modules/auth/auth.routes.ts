import { Router } from 'express';
import { authControllers } from './auth.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './authValidation';

const router = Router();

router.post(
  '/register',
  validateRequest(authValidation.createUserValidationSchema),
  authControllers.register,
);

router.post(
  '/login',
  validateRequest(authValidation.loginValidationschema),
  authControllers.loginUser,
);

export const authRoutes = router;
