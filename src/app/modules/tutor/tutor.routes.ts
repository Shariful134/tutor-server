import { Router } from 'express';
import { tutorsControllers } from './tutor.controllers';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/auth.constant';

const router = Router();

router.get('/', tutorsControllers.getTutors);

router.get('/:id', tutorsControllers.getTutor);
router.delete('/:id', auth(USER_ROLE.admin), tutorsControllers.deleteTutor);

export const tutorRoutes = router;
