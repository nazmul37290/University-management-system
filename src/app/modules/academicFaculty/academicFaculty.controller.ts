import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AcademicFacultyServices } from './academicFaculty.services';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const faculty = req.body;
    const result =
      await AcademicFacultyServices.createAcademicFacultyIntoDB(faculty);
    res.status(200).json({
      success: true,
      message: 'Academic Faculty created successfully',
      data: result,
    });
  },
);

const getAllAcademicFaculties = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicFacultyServices.getAllAcademicFacultiesFromDB();
    res.status(200).json({
      success: true,
      message: 'Academic Faculties are retrieved successfully',
      data: result,
    });
  },
);

const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { facultyId } = req.params;
    const result =
      await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);
    res.status(200).json({
      success: true,
      message: 'Academic Faculty is retrieved successfully',
      data: result,
    });
  },
);

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    facultyId,
    req.body,
  );

  res.status(200).json({
    success: true,
    message: 'Academic Faculty updated successfully',
    data: result,
  });
});

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
