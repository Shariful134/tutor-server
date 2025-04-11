import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookiePerser from 'cookie-parser';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookiePerser());

app.use(
  cors({
    origin: [' http://localhost:3000'],
    // origin: ['https://tutor-client-psi.vercel.app/'],
    credentials: true,
  }),
);

//application routes
app.use('/api/v1/', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Tutor-Link-server hello!');
});

// Error Handler
app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
