export enum UserRole {
  admin = 'admin',
  teacher = 'teacher',
  student = 'student',
}

export interface LoginForm {
  username: string;
  password: string;
  remember: boolean;
}
