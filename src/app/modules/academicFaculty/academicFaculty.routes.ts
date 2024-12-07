import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  AcademicFacultyController.createAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
