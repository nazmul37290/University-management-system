import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department must be a string',
      required_error: 'Academic Department is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Faculty must be a string',
      required_error: 'Academic Faculty is required',
    }),
  }),
});

const updateAcadmicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Department must be a string',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic Faculty must be a string',
      })
      .optional(),
  }),
});

export const academicDepartmentValidations = {
  createAcademicDepartmentValidationSchema,
  updateAcadmicDepartmentValidationSchema,
};
