import { z } from 'zod';
import {
  academicSemesterCodes,
  academicSemesterNames,
  months,
} from './academicSemester.constaints';

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...academicSemesterNames] as [string, ...string[]]),
    year: z.string({
      invalid_type_error: 'Year must be a string',
      required_error: 'Year is required',
    }),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]]),
    startMonth: z.enum([...months] as [string, ...string[]]),
    endMonth: z.enum([...months] as [string, ...string[]]),
  }),
});
const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z
      .enum([...academicSemesterNames] as [string, ...string[]])
      .optional(),
    year: z
      .string({
        invalid_type_error: 'Year must be a string',
        required_error: 'Year is required',
      })
      .optional(),
    code: z
      .enum([...academicSemesterCodes] as [string, ...string[]])
      .optional(),
    startMonth: z.enum([...months] as [string, ...string[]]).optional(),
    endMonth: z.enum([...months] as [string, ...string[]]).optional(),
  }),
});

export const AcademicSemesterValidations = {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
};
