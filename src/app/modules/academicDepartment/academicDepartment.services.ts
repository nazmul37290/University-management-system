import { TAcademicDepartment } from './academicDepartment.interface';
import { academicDepartmentModel } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (
  department: TAcademicDepartment,
) => {
  const result = await academicDepartmentModel.create(department);
  return result;
};

const getAllAcademicDepartments = async () => {
  const result = await academicDepartmentModel.find({});
  return result;
};

const getSingleAcademicDepartment = async (id: string) => {
  const result = await academicDepartmentModel.findById({ _id: id });
  return result;
};

const updateAcademicDepartment = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await academicDepartmentModel.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true },
  );

  return result;
};

export const academicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
