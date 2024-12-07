import { z } from 'zod';

const academicFacultyValidationSchema = z.object({
  name: z.string({
    invalid_type_error: 'Academic Faculty name must be a string',
  }),
});

export const academicFacultyValidation = {
  academicFacultyValidationSchema,
};
