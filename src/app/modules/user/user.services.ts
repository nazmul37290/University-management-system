import mongoose from 'mongoose';
import config from '../../config';
import { AppError } from '../../errors/AppError';
import academicSemesterModel from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { userModel } from './user.model';
import { generateStudentUserId } from './user.utils';
import { academicDepartmentModel } from '../academicDepartment/academicDepartment.model';

const createStudentIntoDB = async (password: string, student: Student) => {
  const userData: Partial<TUser> = {};
  userData.role = 'student';
  userData.password = password || (config.default_pass as string);
  const admissionSemester = await academicSemesterModel.findById(
    student.admissionSemester,
  );
  if (!admissionSemester) {
    throw new AppError(404, 'Admission semester not found');
  }
  const academicDepartment = await academicDepartmentModel.findById(
    student.academicDepartment,
  );
  if (!academicDepartment) {
    throw new AppError(404, 'Academic department not found');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateStudentUserId(admissionSemester);

    // transaction 1
    const newUser = await userModel.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(400, 'Failed to create user');
    }
    student.id = newUser[0].id;
    student.user = newUser[0]._id;

    // transaction 2
    const newStudent = await StudentModel.create([student], { session });
    if (!newStudent.length) {
      throw new AppError(400, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, 'Failed to create student');
  }
};

export const UserServices = {
  createStudentIntoDB,
};
