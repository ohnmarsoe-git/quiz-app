import express from 'express';
// import * as controllers from '../../../controllers/quizControllers.js'
import quiz from './quiz.js'
import catetory from './category.js';

const router = express.Router();

router.use('/quiz', quiz);

router.use('/category', catetory);

export default router;


// router.get('/', controllers.getAll);

// router.get('/:id', controllers.getOne);

// router.post('/', controllers.createNew);

// router.patch('/:id', controllers.updateOne);

// router.delete('/:id', controllers.deleteOne);
