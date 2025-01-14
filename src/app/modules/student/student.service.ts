import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import { AppError } from '../../errors/AppError';
import { userModel } from '../user/user.model';
import { Student } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { searchableFields } from './student.constaints';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // const searchableFields = ['name.firstName', 'email', 'presentAddress'];
  // let searchTerm = '';

  // if (query.searchTerm) {
  //   searchTerm = query.searchTerm as string;
  // }
  // const queryObj = { ...query };
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // excludeFields.forEach((el) => delete queryObj[el]);

  // const searchQuery = StudentModel.find({
  //   $or: searchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });

  // let sort = '-createdAt';

  // if (query.sort) {
  //   sort = query.sort as string;
  // }
  // const sortQuery = filterQuery.sort(sort);

  // let limit = 100;
  // if (query.limit) {
  //   limit = Number(query.limit);
  // }

  // let page = 1;
  // let skip = 0;
  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  // let fields = '';
  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  // }

  // const paginatedQuery = sortQuery.skip(skip);
  // const limitQuery = paginatedQuery.limit(limit);

  // const fieldsQuery = await limitQuery.select(fields);

  // return fieldsQuery;

  const studentQuery = new QueryBuilder(StudentModel.find(), query)
  .search(searchableFields)
  .filter()
  .sort()
  .paginate()
  .limitFields()

  const result= await studentQuery.modelQuery;

  return result

};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<Student>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }
  const result = await StudentModel.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const student = await StudentModel.findOne({ id });
  if (!student) {
    throw new AppError(404, 'Student Not Found');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // transaction 1
    const deletedUser = await userModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(400, 'Failed to delete user');
    }
    // transaction 2
    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(400, 'Failed to delete Student');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(500, 'Failed to delete Student');
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
