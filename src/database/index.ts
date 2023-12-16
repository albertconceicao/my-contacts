const { Client } = require('pg');

const client = new Client({
	host: 'localhost',
	port: 5432,
	database: 'mycontacts',
	user: 'root',
	password: 'root',
});

client.connect();

export const Query = async (query: string, values?: string[]) => {
	const { rows } = await client.query(query, values);

	return rows;
};
