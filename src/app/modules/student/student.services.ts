import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from '../auth/auth.model';

//get all student
const getStudentsIntoDB = async () => {
  const result = await User.find();
  if (!result.length) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Student is not found!');
  }
  const tutors = result.filter((tutor) => tutor.role == 'student');
  return tutors;
};
//get signle student
const getStudentIntoDB = async (id: string) => {
  const result = await User.findById(id);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Student is not found!');
  }

  return result;
};
//delete student
const deleteStudentsIntoDB = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Student is not found!');
  }

  return result;
};

export const studentsServices = {
  getStudentsIntoDB,
  getStudentIntoDB,
  deleteStudentsIntoDB,
};
