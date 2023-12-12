import express from 'express';

const app = express();

interface IUser {
	name: string;
	email: string;
	password: string;
}
const user = {} as IUser;

const isThisUserValid =
	user.name &&
	user.password &&
	user.email &&
	user.email.includes('@') &&
	user.password.length > 8;

app.listen(3001, () => {
	console.log('Server is running on server 3001');
});
