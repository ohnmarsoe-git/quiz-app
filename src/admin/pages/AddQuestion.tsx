import React from 'react'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import Select from 'react-select';
import useCommonApi from '../../hooks/useCommonApi'
// import BASEAPI from '../../API/config';
import CategorySelect from '../components/CategorySelect';

interface Questions {
  message?: any;
  question: string;
  level: string;
  answers: string[];
  correct_answer: string
}

const AddQuestion = () => {

  const { isLoading, error, makeRequest } = useCommonApi<Questions>('/api/v1/quiz');

  // const methods = useForm();


  const { register, handleSubmit, formState: { errors }, reset} = useForm();
  
  const onSubmit = (formData:any) => {
    let postData = {
      "category" : formData.category,
      "level": formData.level,
      "question": formData.question,
      "answers": [formData.answer1, formData.answer2, formData.answer3, formData.answer4],
      "correct_answer": formData.correct_answer
    }

    makeRequest('/api/v1/quiz', 'POST', postData)

    reset();
  }

  // console.log( methods.formState.errors.category)

  return (
    <>
      <section className="bg-gray-5">
        <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow  md:mt-0 xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                      ADD Question
                  </h1>
                  {error?.message && <p className='text-red-500 text-sm'>This Question is already exists!</p> }
                  { /* <FormProvider {...methods}> */}
                  <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                      <div>
                          <label htmlFor="Question" className="block mb-2 text-sm font-medium text-gray-900 ">Question</label>
                          <input type="text" 
                          {...register('question', { 
                            required: true,
                          })}
                          id="question" 
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="What is ...... ?"/>
                          {errors.question?.type === "required" && <p className='text-red-500 text-sm mt-1' role="alert">Question is required</p>}
                          
                      </div>
                      <div>
                        <label htmlFor="answers" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Answers</label>
                        <div className='flex gap-2 mb-2'>
                          
                        <input type="text" 
                          {...register('answer1', { 
                            required: true,
                          })}
                          id="answer-1" 
                          className="bg-gray-50 
                          border border-gray-300 
                          text-gray-900 sm:text-sm 
                          rounded-lg 
                          focus:ring-primary-600 focus:border-primary-600 
                          block w-full p-2.5 
                          dark:bg-gray-700 dark:border-gray-600
                          dark:placeholder-gray-400 dark:text-white
                          dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                          placeholder=""/>
                        
                          <input type="text" 
                          {...register('answer2', { 
                            required: true,
                          })}
                          id="answer-2" 
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""/>
                          </div>

                          {errors.answer1 && (
                          <div className='flex gap-2 mb-5'>
                            {errors.answer1?.type === 'required' &&  (
                            <p className='block w-full text-red-500 text-sm mt-1'>Answer 1 is required.</p>)}

                            {errors.answer2?.type === 'required' &&  (
                            <p className='block w-full text-red-500 text-sm mt-1'>Answer 2 answer is required.</p>)}
                          </div>
                          )}

                          <div className='flex gap-2 mb-5'>
                            <input type="text" 
                            {...register('answer3', { 
                              required: true,
                            })}
                            id="answer-3" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""/>
                          
                            <input type="text" 
                            {...register('answer4', { 
                              required: true,
                            })}
                            id="answer-4" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""/>
                        </div>

                          {errors.answer3 && (
                            <div className='flex gap-2 mb-5'>
                              {errors.answer3?.type === 'required' &&  (
                              <p className='block w-full text-red-500 text-sm mt-1'>Answer 1 is required.</p>)}

                              {errors.answer4?.type === 'required' &&  (
                              <p className='block w-full text-red-500 text-sm mt-1'>Answer 2 answer is required.</p>)}
                            </div>
                          )}
                      
                      </div>
                      <div>
                          <label htmlFor="correct_answer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correct Answer</label>
                          <input 
                            type="text" 
                            {...register('correct_answer', { 
                              required: true,
                            })}
                            id="correct_answer" 
                            placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                          
                          {errors.correct_answer?.type === "required" &&  (
                            <p className='text-red-500 text-sm mt-1'>Correct answer is required.</p>
                          )}
                          
                      </div>

                      <div>
                        
                        {/* <Controller
                          name="category"
                          control={control}
                          render={({field}) => (
                            <CategorySelect fields={field} onChange={handleChange}/>
                          )} /> */ }

                        <CategorySelect register={register} error={ errors.category }/>
                        
                      </div>

                      <div>
                        <label htmlFor="level" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Level</label>
                        <input 
                            type="radio" 
                            {...register('level', { 
                              required: true,
                            })}
                            id="level" 
                            value= "Beginner"
                            placeholder="" className="mr-1 "/> Beginner
                            <input 
                            type="radio" 
                            {...register('level', { 
                              required: true,
                            })}
                            id="level" 
                            value= "Senior"
                            placeholder="" className="ml-1 mr-1 "/> Senior
                      </div>
                      
                      <button type="submit" className="max-w-md text-center inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">Sign in</button>
                      
                  </form>
                  {/* </FormProvider> */}
                  
              </div>
          </div>
      </div>
    </section>
  </>
  )
}

export default AddQuestion