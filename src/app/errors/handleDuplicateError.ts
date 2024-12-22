/* eslint-disable @typescript-eslint/no-explicit-any */
import { TGenericErrorResponse } from '../interface/errorInterface';

export const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const duplicateResource = err.message.match(/\{(.*?)\}/);
  const errorSources = [
    {
      path: '',
      message: `${duplicateResource[1]} is already exists`,
    },
  ];

  return {
    statusCode: 409,
    message: 'Duplicate Error',
    errorSources,
  };
};
