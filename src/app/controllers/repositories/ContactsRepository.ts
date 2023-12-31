// Connect with Data Source

import { Query } from '../../../database';

interface IContact {
	id?: string;
	name: string;
	email: string;
	phone: string;
	category_id: string;
}
export class ContactsRepository {
	async findAll(orderBy?: string) {
		const direction = orderBy?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
		const rows = await Query(
			`SELECT contacts.*, categories.name AS category_name
			FROM contacts
			LEFT JOIN categories ON categories.id = contacts.category_id
			ORDER BY contacts.name ${direction}`,
		);

		return rows;
	}

	async findById(id: string) {
		const [row] = await Query(
			`
			SELECT contacts.*, categories.name AS category_name
			FROM contacts
			LEFT JOIN categories ON categories.id = contacts.category_id
			WHERE contacts.id = $1
		`,
			[id],
		);

		return row;
	}

	async findByEmail(email: string) {
		const [row] = await Query(`SELECT * FROM contacts WHERE email = $1`, [
			email,
		]);

		return row;
	}

	async create({ name, email, phone, category_id }: IContact) {
		const [row] = await Query(
			`INSERT INTO contacts (name, email, phone, category_id) VALUES ($1, $2, $3, $4) RETURNING *`,
			[name, email, phone, category_id],
		);

		return row;
	}

	async update(id: string, { name, email, phone, category_id }: IContact) {
		const [row] = await Query(
			`UPDATE  contacts
			SET name = $1,
			email = $2,
			phone = $3,
			category_id = $4
			WHERE id = $5
			RETURNING *`,
			[name, email, phone, category_id, id],
		);

		return row;
	}

	async delete(id: string) {
		const deleteOp = await Query(
			`DELETE FROM  contacts WHERE id = $1 RETURNING *`,
			[id],
		);
		return deleteOp;
	}
}
