import { Router } from 'express';
import { studentsControllers } from './student.controller';

const router = Router();

router.get('/', studentsControllers.getStudents);

router.get('/:id', studentsControllers.getStudent);

router.delete('/:id', studentsControllers.deleteStudent);

export const studentRoutes = router;
