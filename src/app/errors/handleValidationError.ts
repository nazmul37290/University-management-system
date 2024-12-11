import mongoose from 'mongoose';
import { TErrorSources } from '../interface/errorInterface';

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errorSources: TErrorSources = Object.values(err.errors).map((val) => {
    return {
      path: val.path,
      message: val.message,
    };
  });
  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};
export default handleValidationError;
