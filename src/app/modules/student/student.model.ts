import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';
import { AppError } from '../../errors/AppError';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuradianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<Student>(
  {
    id: { type: String, unique: true, required: true },
    name: userNameSchema,
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'user ID is required'],
      unique: true,
      ref: 'userModel',
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'gender is required'],
    },
    dateOfBirth: { type: String },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodgGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: guardianSchema,
    admissionSemester: {
      type: Schema.Types.ObjectId,
      required: [true, 'admission semester ID is required'],
      ref: 'Academic-Semester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    localGuardian: localGuradianSchema,
    profileImg: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

studentSchema.pre('save', async function (next) {
  const email = this.email;
  const isEmailExists = await StudentModel.findOne({ email: email });
  if (isEmailExists) {
    throw new AppError(409, 'Email already exists');
  }
  next();
});

export const StudentModel = model<Student>('Student', studentSchema);
