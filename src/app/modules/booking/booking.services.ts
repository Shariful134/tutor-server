import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { RequestBooking } from './booking.interface';
import { Booking } from './booking.model';
import { User } from '../auth/auth.model';
import { bookingUtils } from './bookings.utils';

export type TStudent = {
  _id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role: 'student' | 'tutor' | 'admin';
  profileImage?: string;
};

//request booking
const createBookingRequestIntoDB = async (
  email: string,
  payload: RequestBooking,
) => {
  const student = await User.findById(payload.student);
  const tutor = await User.findById(payload.tutor);

  const existingBooking = await Booking.findOne({
    tutor: payload.tutor,
    student: payload.student,
  });

  if (existingBooking) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'All ready requested');
  }

  if (!student) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Student is not found!');
  }
  if (!tutor) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Tutor is not found!');
  }
  if (email !== student.email) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Student does not match!');
  }
  const result = await Booking.create(payload);
  return result;
};

//accept booking
const acceptBookingRequestIntoDB = async (email: string, id: string) => {
  const request = await Booking.findById(id);
  const tutor = await User.findById(request?.tutor);
  const loggedTutor = await User.findOne({ email });

  if (!request) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Request is not found!');
  }
  if (!loggedTutor) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Tutor is not found!');
  }

  if (!tutor?._id.equals(loggedTutor._id)) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Tutor Does not Match!');
  }
  const result = await Booking.findByIdAndUpdate(
    id,
    { bookingRequest: true },
    { new: true },
  );
  return result;
};

//bookingConfirmation
const createBookingIntoDB = async (
  userEmail: string,
  payload: Partial<RequestBooking>,
  id: string,
  client_ip: string,
) => {
  //const request of booking
  const requestBooking = await Booking.findById(id);
  const bookingRequest = requestBooking?.bookingRequest;

  // checking request accept or cancel
  if (!bookingRequest) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Waiting for tutor approval.');
  }
  //check if user exixts
  const student = await User.findById(payload.student);
  if (!student) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Student is not found!');
  }
  if (student?.email !== userEmail) {
    throw new AppError(StatusCodes.NOT_FOUND, 'You are not Authorized!');
  }

  const tutor = await User.findById(payload.tutor);
  let totalPrice;
  if (tutor) {
    const hourlyRate = tutor.hourlyRate;
    totalPrice = (payload.duration as number) * hourlyRate;
  } else {
    throw new AppError(StatusCodes.NOT_FOUND, 'Tutor is not found!');
  }

  const bookingData = {
    ...payload,
    student,
    tutor,
    totalPrice,
    userEmail,
  };

  let booking = await Booking.findByIdAndUpdate(id, bookingData, { new: true });

  // console.log('bookingData: ', booking);

  // Payment integretation
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: booking?._id,
    currency: 'BDT',
    customer_name: student.name,
    customer_address: payload.address,
    customer_email: student.email,
    customer_phone: payload.phone,
    customer_city: 'N/a',
    client_ip,
    customer_state: booking?._id,
  };

  //payment
  const payment = await bookingUtils.makePaymentAsync(shurjopayPayload);
  if (payment?.transactionStatus) {
    booking = await booking?.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};

//verify order
const verifyPayment = async (order_id: string) => {
  let verifiedPayment = await bookingUtils.verifyPaymentAsync(order_id);
  if (verifiedPayment.length) {
    await Booking.findOneAndUpdate(
      { 'transaction.id': order_id },
      {
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.date_time': verifiedPayment[0].date_time,
        'transaction.method': verifiedPayment[0].method,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.bank_status': verifiedPayment[0].bank_status,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
};

//get bookings
const getBookingsIntoDB = async () => {
  const result = await Booking.find().populate('student');
  if (!result.length) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Bookings not Found1');
  }
  return result;
};

//get Allbookings
const getAllBookingsIntoDB = async () => {
  const result = await Booking.find().populate('student').populate('tutor');
  if (!result.length) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Bookings not Found!');
  }
  return result;
};

//getSingleBookingIntoDb
const getSingleBookingIntoDB = async (id: string) => {
  const result = await Booking.findById(id)
    .populate('student')
    .populate('tutor');
  return result;
};

const updateBookingIntoDB = async (
  id: string,
  payload: Partial<RequestBooking>,
) => {
  const result = await Booking.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteBookingIntoDB = async (id: string) => {
  const result = await Booking.findByIdAndDelete(id);
  return result;
};

export const bookingServices = {
  createBookingRequestIntoDB,
  acceptBookingRequestIntoDB,
  createBookingIntoDB,
  getAllBookingsIntoDB,
  updateBookingIntoDB,
  verifyPayment,
  deleteBookingIntoDB,
  getBookingsIntoDB,
  getSingleBookingIntoDB,
};
