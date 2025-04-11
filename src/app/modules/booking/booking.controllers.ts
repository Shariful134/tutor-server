import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { bookingServices } from './booking.services';

//booking request
const createBookingRequest = catchAsync(async (req, res) => {
  const { userEmail } = req.user;

  const result = await bookingServices.createBookingRequestIntoDB(
    userEmail,
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Booking Requeset Successfully',
    data: result,
  });
});

//booking request accept
const acceptBookingRequest = catchAsync(async (req, res) => {
  const { userEmail } = req.user;
  const { id } = req.params;

  const result = await bookingServices.acceptBookingRequestIntoDB(
    userEmail,
    id,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Booking Accept Successfully',
    data: result,
  });
});

//booking confirmation
const createBooking = catchAsync(async (req, res) => {
  const { userEmail } = req.user;
  const { id } = req.params;

  const checkout_url = await bookingServices.createBookingIntoDB(
    userEmail,
    req.body,
    id,
    req.ip!,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Booking  Successfully',
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

//get bookings
const getBooking = catchAsync(async (req, res) => {
  const result = await bookingServices.getBookingsIntoDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bookings are retrived successfully',
    data: result,
  });
});

//get Allbookings
const getAllBooking = catchAsync(async (req, res) => {
  const result = await bookingServices.getAllBookingsIntoDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bookings are retrived successfully',
    data: result,
  });
});

//getSingleBookings
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
    message: ' Booking Deleted Successfully',
    data: result,
  });
});

export const bookingControllers = {
  createBooking,
  createBookingRequest,
  acceptBookingRequest,
  getAllBooking,
  updateBooking,
  deleteBooking,
  getBooking,
  getSingleBooking,
  verifyPament,
};
