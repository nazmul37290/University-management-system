import config from '../../config';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';

import { userModel } from './user.model';

const createStudentIntoDB = async (password: string, student: Student) => {
  const userData: Partial<TUser> = {};
  userData.role = 'student';
  userData.password = password || (config.default_pass as string);
  userData.id = '202510001';
  const newUser = await userModel.create(userData);
  if (Object.keys(newUser).length) {
    student.id = newUser.id;
    student.user = newUser._id;

    const newStudent = await StudentModel.create(student);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
