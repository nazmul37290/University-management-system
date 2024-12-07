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

export const AcademicFacultyController = {
  createAcademicFaculty,
};
