import express from 'express';
import route from './Routes';
import ErrorHandler from './Midleware/error.handle';

const app = express();

app.use(express.json());
app.use(route);
app.use(ErrorHandler.handle);

export default app;