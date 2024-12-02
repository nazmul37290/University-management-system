/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';

const notFoundRoute = (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    success: false,
    message: 'API not found !!',
    error: '',
  });
};

export default notFoundRoute;
