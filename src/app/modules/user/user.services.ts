import config from '../../config';
import academicSemesterModel from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';

import { userModel } from './user.model';
import { generateStudentUserId } from './user.utils';

const createStudentIntoDB = async (password: string, student: Student) => {
  const userData: Partial<TUser> = {};
  userData.role = 'student';
  userData.password = password || (config.default_pass as string);
  const admissionSemester = await academicSemesterModel.findById(
    student.admissionSemester,
  );
  if (!admissionSemester) {
    throw new Error('Admission semester not found');
  }
  userData.id = await generateStudentUserId(admissionSemester);
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
