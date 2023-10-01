import express from 'express';
import * as controllers from '../../../controllers/quizControllers.js'

const router = express.Router();

router.get('/', controllers.getAll);

router.get('/:id', controllers.getOne);

router.post('/', controllers.createNew);

router.patch('/:id', controllers.updateOne);

router.delete('/:id', controllers.deleteOne);

export default router;

