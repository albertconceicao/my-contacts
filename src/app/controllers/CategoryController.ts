import { CategoriesRepository } from './repositories/CategoriesRepository';

const CategoriesRepositoryFunction = new CategoriesRepository();

export class CategoryController {
	async index(request: any, response: any) {
		const { orderBy } = request.query;
		const categories = await CategoriesRepositoryFunction.findAll(orderBy);

		response.json(categories);
	}

	async show(request: any, response: any) {
		const { id } = request.params;

		const category = await CategoriesRepositoryFunction.findById(id);

		if (!category) {
			return response.status(404).json({ error: 'Category not found' });
		}
		response.json(category);
	}

	async store(request: any, response: any) {
		const { name } = request.body;

		if (!name) {
			return response.status(400).json({ error: 'Name is required' });
		}

		const category = await CategoriesRepositoryFunction.create(name);

		response.json(category);
	}

	async update(request: any, response: any) {
		const { name } = request.body;
		const { id } = request.params;

		const categoryExists = await CategoriesRepositoryFunction.findById(id);

		if (!categoryExists) {
			return response.status(404).json({ error: 'Category not found' });
		}

		const category = await CategoriesRepositoryFunction.update(id, name);

		response.json(category);
	}

	async delete(request: any, response: any) {
		const { id } = request.params;

		const categoryExists = await CategoriesRepositoryFunction.findById(id);

		if (!categoryExists) {
			return response.status(404).json({ error: 'Category not found' });
		}

		await CategoriesRepositoryFunction.delete(id);
		response.sendStatus(204);
	}
}
