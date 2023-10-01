import { Quiz } from '../models/Quiz.js';
import * as services from '../services/quizService.js'
import { handleErrors } from '../utils/handleErrors.js';

const getAll = async (req, res) => {
  if(
    !req.body
  ) {
    return;
  }

  // const category = req.body?.category || req.query?.category

  try{
    const data = await services.getAll();
    res.status(200).json({status: "success", data});
  } catch (errors) {
    const error = handleErrors(errors);
    res.status(500).send({ errors: error })
  } 
}

const getCategory = async (req, res) => {

  if(
    !req.body
  ) {
    return;
  }

  try{
    const results = await services.getCategory();
    console.log(results);
    res.status(200).send({status: "success", data: results});
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
    const result = await services.getOne(req.params.id);
    res.status(200).send({status: "success", data: result});
  } catch(errors) {
    const error = handleErrors(errors);
    res.status(500).send({ errors: error })
  }
  
}

const createNew = async (req, res) => {

  console.log(req.body);

  if(
    !req.body
  ) {
    return;
  }

  const addNew = {
    category: req.body.category,
    level: req.body.level,
    question: req.body.question,
    answers: req.body.answers,
    correct_answer: req.body.correct_answer,
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" })
  }

  try {
    const created = await services.createNew(addNew);
    if(created) {
      const results = await services.getAll();
      res.status(201).send({status: "OK", data: results });
    }
  } catch(error) {
    const errors = handleErrors(error);
    res.status(500).send({ errors: errors });
  }
}

const updateOne = async (req, res) => {


  if(
    !req.params.id
  ) {
    return;
  }


  // const updateNew = {
  //   category: req.body.category,
  //   level: req.body.level,
  //   question: req.body.question,
  //   answers: req.body.answers,
  //   correct_answer: req.body.correct_answer
  // }

  const updateNew = req.body;
  
  try {
    const result = await services.updateOne(req.params.id, updateNew);
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
    const del = await services.deleteOne(req.params.id);
    if(del) {
      const results = await services.getAll();
      res.status(200).send({status: "OK", data: results });
    }
  } catch (errors) {
    const error = handleErrors(errors);
    res.status(500).send({ errors: error })
  }
}

export  {
  getAll,
  getCategory,
  getOne,
  createNew,
  updateOne,
  deleteOne
}