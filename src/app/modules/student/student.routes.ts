import { Router } from 'express';
import { studentsControllers } from './student.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/auth.constant';

const router = Router();

router.get('/', studentsControllers.getStudents);

router.get('/:id', studentsControllers.getStudent);

router.delete('/:id', auth(USER_ROLE.admin), studentsControllers.deleteStudent);

export const studentRoutes = router;
