import express from 'express';
// import * as controllers from '../../../controllers/quizControllers.js'
import quiz from './quiz.js'
import catetory from './category.js';
import user from './user.js'
import answers from './answers.js'
import dashbord from './dashbord.js'

const router = express.Router();

router.use('/quiz', quiz);

router.use('/category', catetory);

router.use('/user', user);

router.use('/answers', answers);

router.use('/dashboard', dashbord);

export default router;


// router.get('/', controllers.getAll);

// router.get('/:id', controllers.getOne);

// router.post('/', controllers.createNew);

// router.patch('/:id', controllers.updateOne);

// router.delete('/:id', controllers.deleteOne);
