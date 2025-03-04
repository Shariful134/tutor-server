import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { studentsServices } from './student.services';
//get Students
const getStudents = catchAsync(async (req, res) => {
  const result = await studentsServices.getStudentsIntoDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Students Retrived successfully!',
    data: result,
  });
});

//get single Student
const getStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await studentsServices.getStudentIntoDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student Retrived successfully!',
    data: result,
  });
});
const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await studentsServices.deleteStudentsIntoDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Delted Student successfully!',
    data: result,
  });
});

export const studentsControllers = {
  getStudents,
  getStudent,
  deleteStudent,
};
