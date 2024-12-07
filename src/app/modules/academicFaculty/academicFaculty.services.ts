import { TAcademicFaculty } from './academicFaculty.interface';
import { academicFacultyModel } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (faculty: TAcademicFaculty) => {
  const result = await academicFacultyModel.create(faculty);
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
};
