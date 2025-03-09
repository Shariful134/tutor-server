import { NextFunction, Request, Response, Router } from 'express';
import { authControllers } from './auth.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './authValidation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './auth.constant';
import { upload } from '../../utils/sendImageToCloudinary';

const router = Router();

router.post(
  '/register',
  validateRequest(authValidation.createUserValidationSchema),
  authControllers.register,
);
router.post(
  '/register/as-tutor',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  auth(USER_ROLE.student, USER_ROLE.tutor),
  validateRequest(authValidation.updateUserValidationSchema),
  authControllers.registerasTutor,
);

router.post(
  '/login',
  validateRequest(authValidation.loginValidationschema),
  authControllers.loginUser,
);

export const authRoutes = router;
