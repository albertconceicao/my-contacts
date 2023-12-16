// Connect with Repository

import { ContactsRepository } from './repositories/ContactsRepository';

const ContactsRepositoryFunction = new ContactsRepository();

export class ContactController {
	async index(request: any, response: any) {
		const { orderBy } = request.query;
		const contacts = ContactsRepositoryFunction.findAll(orderBy);

		response.json(contacts);
	}

	async show(request: any, response: any) {
		// List a specific records
		const { id } = request.params;
		const contact = await ContactsRepositoryFunction.findById(id);

		if (!contact) {
			return response.status(404).json({ error: 'User not found' });
		}
		response.json(contact);
	}

	async store(request: any, response: any) {
		// Create a new records
		const { name, email, phone, category_id } = request.body;

		if (!name || !email) {
			return response
				.status(400)
				.json({ error: 'Name and email are both required' });
		}
		const contactExists = await ContactsRepositoryFunction.findByEmail(email);

		if (contactExists) {
			return response
				.status(400)
				.json({ error: 'This email was already been taken!' });
		}
		const contact = await ContactsRepositoryFunction.create({
			name,
			email,
			phone,
			category_id,
		});

		response.json(contact);
	}

	async update(request: any, response: any) {
		// Update a specific records
		const { id } = request.params;
		const { name, email, phone, category_id } = request.body;

		const contactExists = await ContactsRepositoryFunction.findById(id);

		if (!contactExists) {
			return response.status(404).json({ error: 'Contact not found' });
		}
		if (!name || !email) {
			return response
				.status(400)
				.json({ error: 'Name and email are both required' });
		}
		const contactByEmail = await ContactsRepositoryFunction.findByEmail(email);

		if (contactByEmail && contactByEmail.id !== id) {
			return response
				.status(400)
				.json({ error: 'This email was already been taken!' });
		}

		const contact = await ContactsRepositoryFunction.update(id, {
			name,
			email,
			phone,
			category_id,
		});

		response.json(contact);
	}

	async delete(request: any, response: any) {
		// Delete a specific records
		const { id } = request.params;
		const contact = await ContactsRepositoryFunction.findById(id);

		if (!contact) {
			return response.status(404).json({ error: 'User not found' });
		}
		await ContactsRepositoryFunction.delete(id);
		response.sendStatus(204);
	}
}
