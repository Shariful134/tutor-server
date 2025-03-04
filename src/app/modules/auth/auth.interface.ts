import { Model } from 'mongoose';
import { USER_ROLE } from './auth.constant';

export interface IUsers {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'tutor' | 'admin';
  bio?: string;
  subjects?: string[];
  day?:
    | 'Sunday'
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday';

  shift?: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  rating?: number;
  phoneNumber?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TUserLogin = {
  email: string;
  password: string;
};

//create statick method for using  model
export interface UserModel extends Model<IUsers> {
  isUserExistsByEmail(email: string): Promise<IUsers>;
  isPasswordMatched(
    planTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
