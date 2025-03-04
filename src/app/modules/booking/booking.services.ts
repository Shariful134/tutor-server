import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { IBooking } from './booking.interface';
import { Booking } from './booking.model';
import { User } from '../auth/auth.model';

const createBookingIntoDB = async (payload: IBooking) => {
  const student = await User.findById(payload.student);
  if (!student) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Student is not found!');
  }

  const tutor = await User.findById(payload.tutor);
  let totalPrice;
  if (tutor) {
    const hourlyRate = tutor.hourlyRate;
    totalPrice = payload.duration * hourlyRate;
  } else {
    throw new AppError(StatusCodes.NOT_FOUND, 'Tutor is not found!');
  }
  const bookingData = { ...payload, totalPrice };
  const result = await Booking.create(bookingData);
  return result;
};
const getBookingsIntoDB = async () => {
  const result = await Booking.find();
  if (!result.length) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Bookings not Found1');
  }
  return result;
};
const getSingleBookingIntoDB = async (id: string) => {
  const result = await Booking.findById(id);
  return result;
};

const updateBookingIntoDB = async (id: string, payload: Partial<IBooking>) => {
  const result = await Booking.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteBookingIntoDB = async (id: string) => {
  const result = await Booking.findByIdAndDelete(id);
  return result;
};

export const bookingServices = {
  createBookingIntoDB,
  updateBookingIntoDB,
  deleteBookingIntoDB,
  getBookingsIntoDB,
  getSingleBookingIntoDB,
};
