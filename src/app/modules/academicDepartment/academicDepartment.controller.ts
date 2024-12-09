import { AppError } from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import { academicDepartmentServices } from './academicDepartment.services';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const department = req.body;
  const result =
    await academicDepartmentServices.createAcademicDepartmentIntoDB(department);
  res.status(200).json({
    success: true,
    message: 'Academic department created successfully',
    data: result,
  });
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const result = await academicDepartmentServices.getAllAcademicDepartments();
  res.status(200).json({
    success: true,
    message: 'Academic departments retrieved successfully',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await academicDepartmentServices.getSingleAcademicDepartment(departmentId);
  if (!result) {
    throw new AppError(404, 'Department not found');
  }
  res.status(200).json({
    success: true,
    message: 'Academic department retrieved Successfully',
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const payload = req.body;
  const { departmentId } = req.params;
  const result = await academicDepartmentServices.updateAcademicDepartment(
    departmentId,
    payload,
  );
  res.status(200).json({
    success: true,
    message: 'Academic Department updated successfully',
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
