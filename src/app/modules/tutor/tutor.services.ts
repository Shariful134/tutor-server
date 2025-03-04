import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from '../auth/auth.model';

//get all tutors
const getTutorsIntoDB = async () => {
  const result = await User.find();
  if (!result.length) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Tutors is not found!');
  }
  const tutors = result.filter((tutor) => tutor.role == 'tutor');
  return tutors;
};

//get single tutor
const getTutorIntoDB = async (id: string) => {
  const result = await User.findById(id);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Tutors is not found!');
  }

  return result;
};
// delete tutor
const deleteTutorIntoDB = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Tutors is not found!');
  }

  return result;
};

export const tutorServices = {
  getTutorsIntoDB,
  getTutorIntoDB,
  deleteTutorIntoDB,
};
