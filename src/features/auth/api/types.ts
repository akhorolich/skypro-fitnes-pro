export type User = {
  _id: string;
  email: string;
  selectedCourses: string[];
  courseProgress: [];
};

export type LoginRequest = { email: string; password: string };
export type LoginResponse = { token: string };

export type RegisterRequest = { email: string; password: string };
export type RegisterResponse = { message: string };

export type MeResponse = {
  user: User;
};
