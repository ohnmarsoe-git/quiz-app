import { User } from '../models/User.js';
import * as services from '../services/services.js'
import { handleErrors } from '../utils/handleErrors.js';

const getAll = async (req, res) => {
  try{
    const data = await services.getAll(User);
    res.status(200).json({status: "success", data});
  } catch (errors) {
    const error = handleErrors(errors);
    res.status(500).send({ errors: error })
  } 
}

const getOne = async (req, res) => {

  if(
    !req.params.id
  ) {
    return;
  }

  try {
    const result = await services.getOne( User,req.params.id);
    res.status(200).send({status: "success", data: result});
  } catch(errors) {
    const error = handleErrors(errors);
    res.status(500).send({ errors: error })
  }
}

const updateOne = async (req, res) => {

  if(
    !req.params.id
  ) {
    return;
  }

  const updateNew = req.body;
  
  try {
    const result = await services.updateOne(User, req.params.id, updateNew);
    res.status(200).send({status: "success", data: result});
  } catch(errors) {
    const error = handleErrors(errors);
    res.status(500).send({ errors: error })
  }

}

const deleteOne = async (req, res) => {
  if(
    !req.params.id
  ) {
    return;
  }

  try {
    const del = await services.deleteOne(User, req.params.id);
    if(del) {
      const results = await services.getAll(User);
      res.status(200).send({status: "OK", data: results });
    }
  } catch (errors) {
    console.log(errors);
    const error = handleErrors(errors);
    res.status(500).send({ errors: error })
  }
}

export  {
  getAll,
  getOne,
  updateOne,
  deleteOne
}