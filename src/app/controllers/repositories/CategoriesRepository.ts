import { Query } from '../../../database';

export class CategoriesRepository {
	async findAll(orderBy?: string) {
		const direction = orderBy?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

		const rows = await Query(
			`SELECT * FROM categories ORDER BY name ${direction}`,
		);

		return rows;
	}

	async findById(id: string) {
		const [row] = await Query(`SELECT * FROM categories WHERE id = $1`, [id]);

		return row;
	}

	async create(name: string) {
		const [row] = await Query(
			'INSERT INTO categories (name) VALUES ($1) RETURNING *',
			[name],
		);

		return row;
	}

	async update(id: string, name: string) {
		const [row] = await Query(
			`
			UPDATE categories
			SET name = $2 WHERE id = $1 RETURNING *`,
			[id, name],
		);

		return row;
	}

	async delete(id: string) {
		const [row] = await Query(
			`
			DELETE FROM categories
			WHERE id = $1 RETURNING *`,
			[id],
		);

		return row;
	}
}
