import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { tutorServices } from './tutor.services';

const getTutors = catchAsync(async (req, res) => {
  const result = await tutorServices.getTutorsIntoDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Tutors Retrived successfully!',
    data: result,
  });
});

//get single tutor
const getTutor = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await tutorServices.getTutorIntoDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Tutor Retrived successfully!',
    data: result,
  });
});

//delte tutor
const deleteTutor = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await tutorServices.deleteTutorIntoDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Tutor Deleted successfully!',
    data: result,
  });
});

export const tutorsControllers = {
  getTutors,
  getTutor,
  deleteTutor,
};
