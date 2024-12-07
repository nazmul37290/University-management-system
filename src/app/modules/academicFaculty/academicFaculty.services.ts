import { TAcademicFaculty } from './academicFaculty.interface';
import { academicFacultyModel } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (faculty: TAcademicFaculty) => {
  const result = await academicFacultyModel.create(faculty);
  return result;
};

const getAllAcademicFacultiesFromDB = async () => {
  const result = await academicFacultyModel.find({});
  return result;
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await academicFacultyModel.findById(id);
  return result;
};

const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await academicFacultyModel.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true },
  );
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
};
