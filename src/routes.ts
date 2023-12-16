// The router purpose is to send the requests to Controllers and activate his methods. The Controller will connect with Repository, that will connect with Data Source and return to Controller the result

import { Router } from 'express';

import { CategoryController } from './app/controllers/CategoryController';
import { ContactController } from './app/controllers/ContactController';

const ContactControllerFunction = new ContactController();
const CategoryControllerFunction = new CategoryController();

export const router = Router();

router.get('/contacts', ContactControllerFunction.index);
router.get('/contacts/:id', ContactControllerFunction.show);
router.delete('/contacts/:id', ContactControllerFunction.delete);
router.post('/contacts/', ContactControllerFunction.store);
router.put('/contacts/:id', ContactControllerFunction.update);

router.get('/categories', CategoryControllerFunction.index);
router.get('/categories/:id', CategoryControllerFunction.show);
router.post('/categories', CategoryControllerFunction.store);
router.put('/categories/:id', CategoryControllerFunction.update);
router.delete('/categories/:id', CategoryControllerFunction.delete);
