import { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../modules/auth/auth.interface';

export interface CustomJwtPayload extends JwtPayload {
  userEmail: string;
  role: TUserRole;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user: CustomJwtPayload;
    }
  }
}
