import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { bookingServices } from './booking.services';

const createBooking = catchAsync(async (req, res) => {
  const { userEmail } = req.user;

  const checkout_url = await bookingServices.createBookingIntoDB(
    userEmail,
    req.body,
    req.ip!,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Booking  successfully',
    data: { checkout_url },
  });
});

//payment verify
const verifyPament = catchAsync(async (req, res, next) => {
  const order = await bookingServices.verifyPayment(
    req.query.order_id as string,
  );
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Bookings verifyed  Successful',
    data: order,
  });
});

const getBooking = catchAsync(async (req, res) => {
  const result = await bookingServices.getBookingsIntoDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bookings are retrived successfully',
    data: result,
  });
});
const getSingleBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await bookingServices.getSingleBookingIntoDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Booking rertrived successfully',
    data: result,
  });
});

const updateBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await bookingServices.updateBookingIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Booking updated successfully',
    data: result,
  });
});

const deleteBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await bookingServices.deleteBookingIntoDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: ' Booking Deleted successfully',
    data: result,
  });
});

export const bookingControllers = {
  createBooking,
  updateBooking,
  deleteBooking,
  getBooking,
  getSingleBooking,
  verifyPament,
};
