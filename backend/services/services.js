const getAll = async (modelName) => {
  const allResults = await modelName.find().exec();
  return allResults;
}

const getCount = async (modelName) => {
  const allResults = await modelName.countDocuments({}).exec();;
  return allResults;
}

const getOne = async (modelName, id) => {
  const result = await modelName.findById(id).exec();
  return result;
}

const createNew = (modelName, addNew) => {
  const createdNew = modelName.create(addNew);
  return createdNew;
}

const updateOne = (modelName, id, updateNew) => {
  
  const updateNewInsert = {
    ...updateNew,
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" })
  };

  const updateNewOne = modelName.findByIdAndUpdate(
    id,
    updateNewInsert,
    { new: true }
  );

  return updateNewOne;
}

const deleteOne = (modelName, id) => {
  
  const deleteRecord = modelName.findByIdAndRemove(id);

  return deleteRecord;
}

export {
  getAll,
  getCount,
  getOne,
  createNew,
  updateOne,
  deleteOne
}
