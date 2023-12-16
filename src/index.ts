import express from 'express';

import { router } from './routes';

import 'express-async-errors';

const app = express();

app.use(express.json());

app.use(router);
app.use((error: any, request: any, response: any, next: any) => {
	console.log('###### Error Handler ######');
	console.log(error);
	response.sendStatus(500);
});
app.listen(3001, () => {
	console.log('Server started at http://localhost:3000');
});
