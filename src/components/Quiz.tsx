import React, {FC, useEffect, useState, useReducer} from 'react'
import { Questions, Category } from '../types/types'
import Question from './Question'
import Answertime from './Answertime'
import useCommonApi from '../hooks/useCommonApi'

const Quiz:FC = () => {

  let count = 0;
 
  const { data, isLoading, error } = useCommonApi<Questions>('/api/v1/quiz', 'GET')

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finish, setFinish] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(0);
  const [showTimer, setShowTimer] = useState(true);

  if(data?.length) {
    count = data?.length;
  }

  const handleCheckAnswer = () => {
    if( nextQuestion === count - 1 ) {
      setFinish(true);
    }
  }

  const handleAnswer = (answer: string) => {

    //@ts-ignore
    // dispatch({type: "LOAD_QUESTIONS", payload: data[currentQuestion].question})
    
    // //@ts-ignore
    // dispatch({ type: "CHECK_ANSWER" })

    setFinish(false);
    setShowTimer(false);

    if( answer && answer === data?.[currentQuestion].correct_answer) {
      setScore(prev => prev + 1);
    }

    if( nextQuestion < count) {
      setCurrentQuestion(prev => prev + 1);
      setNextQuestion(prev => prev + 1);
    }

    if( nextQuestion === count - 1) {
      setFinish(true);
    }

    setTimeout(() => {
      setShowTimer(true);
    })
    
  }

  // const countQuestions = () => {
  //   if (currentQuestion === data?.length) {
  //     return currentQuestion;
  //   } else if (currentQuestion > 0) {
  //     return currentQuestion + 1;
  //   } else {
  //     return 1;
  //   }
  // }

  const handleTimeUp = () => {
    setScore(prev => prev + 0);
    handleAnswer('');
  }

  const scroeCal = () => {
    if(score === 0) {
      return 'Failed!'
    } else {
      return 'Congrats!'
    }
  }
  
  return (
    <div  className='max-w-screen-xl mx-auto mt-20'>
      <div className='bg-slate-100 rounded shadow border-solid border-slate-500 mt-52'>
        <h2 className='p-3 text-2xl font-bold bg-slate-500 text-slate-50'>{ data?.[currentQuestion].category?.category.toUpperCase() }</h2>
          { showTimer && !finish && <Answertime duration={10} onTimeUp={handleTimeUp} />  }
          <div className={`md:mx-0 ml-0 text-left p-5 ${finish ? 'hidden' : 'block' } `}>
            <div className='mx-0 mr-0 text-right text-2xl font-medium my-5'>Q: { currentQuestion + 1 } / { count }</div>
              
              { nextQuestion < count ?
                  (
                    <>
                      <Question 
                        question = {data?.[currentQuestion].question}
                        answers  = {data?.[currentQuestion].answers}
                        correct_answer = {data?.[currentQuestion].correct_answer}
                        onAnswer = {() => {}}
                      />

                    <div className='flex justify-between'>
                      <p>Level : { data?.[currentQuestion].level}</p>
                      {
                        nextQuestion === count - 1 ? 
                        (
                          <button 
                          className= 'cursor-allowed hover:bg-blue-800 bg-blue-500 text-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2'
                          onClick={handleCheckAnswer}> Finish
                          </button>
                        ):
                        (
                          <button 
                          className= 'cursor-allowed hover:bg-blue-800 bg-blue-500 text-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2'
                          onClick={
                            //@ts-ignore
                            () => handleAnswer(data?.[currentQuestion].correct_answer)
                            }> Next
                          </button>
                        )
                      }
                  </div>

                    </>
                  ): (
                    <div className='mx-auto text-center font-bold'> Well done! Check your final score</div>
                  )

                  
              } 

                

            </div>

            { finish && (
                <div className='mx-auto mt-5 mb-10'>
                  <h2 className='text-center text-2xl font-blod text-slate-950 uppercase pb-5'>
                    {scroeCal()}
                  </h2>
                  <p className='text-center pb-10'>  You got {score} out of { count }</p>
                </div>
            ) }
          </div>
    </div>
  )
}

export default Quiz