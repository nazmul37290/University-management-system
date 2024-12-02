import express from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/students',
    routes: StudentRoutes,
  },
  {
    path: '/users',
    routes: UserRoutes,
  },
];

moduleRoutes.map((route) => router.use(route.path, route.routes));

export default router;
