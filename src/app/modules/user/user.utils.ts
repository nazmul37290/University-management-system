import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { userModel } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await userModel
    .findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

export const generateStudentUserId = async (
  admissionSemester: TAcademicSemester,
) => {
  const currentId = (await findLastStudentId()) || (0).toString();
  const newId = (Number(currentId) + 1).toString().padStart(4, '0');
  const userId = `${admissionSemester.year}${admissionSemester.code}${newId}`;
  return userId;
};
