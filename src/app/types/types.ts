export type TDecoded = {
  data: {
    userEmail: string;
    role: string;
  };
  iat: number;
  exp: number;
};

export type IUserInfo = {
  userEmail: string;
  role: 'tutor' | 'student' | 'admin';
  iat: number;
  exp: number;
};
