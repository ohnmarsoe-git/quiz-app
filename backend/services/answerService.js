import { Answers } from '../models/Answers.js';



const getAllAnswers = async (count) => {

  const populateQuery = [
  {
    path: 'user',
    select: 'firstName lastName email role'
  },
  {
    path: 'category',
    select: 'category'
  }
]
  //const allResults = await Answers.find().populate('user').populate('category').exec();
  const allResults = await Answers.find().populate(populateQuery).sort('-createdAt').limit(count).exec();
  return allResults;
}

export {
  getAllAnswers,
}
