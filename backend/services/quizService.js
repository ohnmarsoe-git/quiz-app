import { Quiz } from '../models/Quiz.js';

const getAll = async () => {
  const allResults = await Quiz.find().populate('category').exec();
  return allResults;
}

const getCount = async () => {
  const allResults = await Quiz.countDocuments({}).exec();;
  return allResults;
}

const getByCategory = async (cat) => {
  const allResults = await Quiz.find({category: "65017f1f25b9202e7a5b3ab5"}).exec();
  return allResults;
}

const getByCategoryLevel = async (filter) => {
  const allResults = await Quiz.find(filter).populate('category').exec();
  return allResults;
}

const getOne = async (id) => {
  const result = await Quiz.findById(id).exec();
  return result;
}

const createNew = (addNew) => {
  const createdNew = Quiz.create(addNew);
  return createdNew;
}

const updateOne = (id, updateNew) => {
  
  const updateNewInsert = {
    ...updateNew,
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" })
  };

  const updateNewOne = Quiz.findByIdAndUpdate(
    id,
    updateNewInsert,
    { new: true }
  );

  return updateNewOne;
}

const deleteOne = (id) => {
  
  const deleteRecord = Quiz.findByIdAndRemove(id);

  return deleteRecord;
}

export {
  getAll,
  getCount,
  getByCategory,
  getByCategoryLevel,
  getOne,
  createNew,
  updateOne,
  deleteOne
}
