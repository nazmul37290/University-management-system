import { TAcademicSemester } from '../academicSemester/academicSemester.interface';

export const generateStudentUserId = (admissionSemester: TAcademicSemester) => {
  const currentId = (0).toString();
  const newId = Number(currentId + 1)
    .toString()
    .padStart(4, '0');
  const userId = `${admissionSemester.year}${admissionSemester.code}${newId}`;

  return userId;
};
