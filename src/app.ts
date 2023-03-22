import express from 'express';
import carsRouter from './Routes/CarRoutes';
import ErrorHandler from './Middlewares/ErrorHandler';
import motocycleRouter from './Routes/MotocycleRoutes';

const app = express();
app.use(express.json());
app.use('/motorcycles', motocycleRouter);
app.use('/cars', carsRouter);
app.use(ErrorHandler.handle);

export default app;
