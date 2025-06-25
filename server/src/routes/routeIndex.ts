import express, { Router } from 'express';
import { defaultRoute } from './defaultRoute';
import { authRoute } from './auth';


//What's the difference between express.Router() and Router()?
export const routes = express.Router();

routes.use(defaultRoute);
routes.use(authRoute);