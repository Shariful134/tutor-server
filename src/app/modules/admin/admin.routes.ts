import { Router } from 'express';
import { studentsControllers } from './admin.controller';

const router = Router();

router.get('/', studentsControllers.getStudents);

export const studentRoutes = router;
