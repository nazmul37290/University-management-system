import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import academicSemesterModel from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';

import { userModel } from './user.model';

const createStudentIntoDB = async (password: string, student: Student) => {
  const userData: Partial<TUser> = {};
  userData.role = 'student';
  userData.password = password || (config.default_pass as string);
  const admissionSemester = await academicSemesterModel.findById(
    student.admissionSemester,
  );
  const generateStudentUserId = (admissionSemester: TAcademicSemester) => {
    const currentId = (0).toString();
    let newId = Number(currentId + 1)
      .toString()
      .padStart(4, '0');
    let userId = `${admissionSemester.year}`;
  };

  userData.id = generateStudentUserId(admissionSemester);
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
