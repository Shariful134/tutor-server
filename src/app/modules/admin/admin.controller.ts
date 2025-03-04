import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { studentsServices } from './admin.services';

const getStudents = catchAsync(async (req, res) => {
  const result = await studentsServices.getStudentsIntoDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Students Retrived successfully!',
    data: result,
  });
});

export const studentsControllers = {
  getStudents,
};
