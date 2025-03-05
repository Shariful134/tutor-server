import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { IBooking } from './booking.interface';
import { Booking } from './booking.model';
import { User } from '../auth/auth.model';
import { bookingUtils } from './bookings.utils';

const createBookingIntoDB = async (
  userEmail: string,
  payload: IBooking,
  client_ip: string,
) => {
  //check if user exixts

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
  const bookingData = { ...payload, totalPrice, userEmail };
  let booking = await Booking.create(bookingData);

  // Payment integretation
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: booking._id,
    currency: 'BDT',
    customer_name: student.name,
    customer_address: payload.address,
    customer_email: student.email,
    customer_phone: payload.phone,
    customer_city: 'N/a',
    client_ip,
    customer_state: booking._id,
  };

  const payment = await bookingUtils.makePaymentAsync(shurjopayPayload);
  if (payment?.transactionStatus) {
    booking = await booking.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }
  console.log(payment);
  return payment.checkout_url;
};

//verify order
const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await bookingUtils.verifyPaymentAsync(order_id);
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
  verifyPayment,
  deleteBookingIntoDB,
  getBookingsIntoDB,
  getSingleBookingIntoDB,
};
