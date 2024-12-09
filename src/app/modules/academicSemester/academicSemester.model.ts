import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  academicSemesterCodes,
  academicSemesterNames,
  months,
} from './academicSemester.constaints';
import { AppError } from '../../errors/AppError';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: academicSemesterNames,
      required: [true, 'Semester name is required'],
    },
    code: {
      type: String,
      enum: academicSemesterCodes,
      required: [true, 'Semester code is required'],
    },
    year: { type: String, required: [true, 'Year is required'] },
    startMonth: {
      type: String,
      enum: months,
      required: [true, 'Start month is required'],
    },
    endMonth: {
      type: String,
      enum: months,
      required: [true, 'End month is required'],
    },
  },
  { timestamps: true },
);

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await academicSemesterModel.findOne({
    name: this.name,
    year: this.year,
  });

  if (isSemesterExists) {
    throw new AppError(409, 'Semester already exists for the given year');
  }
  next();
});

const academicSemesterModel = model<TAcademicSemester>(
  'Academic-Semester',
  academicSemesterSchema,
);

export default academicSemesterModel;
