import React, {FC, useEffect, useState, useReducer} from 'react'
import { Questions } from '../types/types'
import Question from './Question'
import Answertime from './Answertime'
import useCommonApi from '../hooks/useCommonApi'


interface State {
  data: Questions[],
  // currentQuestion: number,
  // correctAnswer: number
}

interface Action {
  type: "LOAD_QUESTIONS" | "ANSWER_QUESTION" | "CHECK_ANSWER" | "RESET_QUIZ";
  payload?: any;
}

function reducer(state: State, action: Action): State {
  console.log(state);
  console.log(action.payload);
  switch(action.type) {
    case "LOAD_QUESTIONS": 
      return {
        ...state,
        data: action.payload
      }
    case "CHECK_ANSWER": {
      console.log(state);
      return state
    }
    case "RESET_QUIZ":
      return {
        //@ts-ignore
        ...initialState,
    };
    default:
      console.log(state);
      return state
  }
}



const Quiz:FC = () => {

  let count = 0;
 
  const { data, isLoading, error } = useCommonApi<Questions>('/api/v1/quiz', 'GET')


  //@ts-ignore
  const [state, dispatch] = useReducer<typeof reducer,State>( reducer, {data});

  //@ts-ignore
  console.log(state?.data);

  const handleClick = () => {
    
  }

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finish, setFinish] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(0);
  const [showTimer, setShowTimer] = useState(true);

  // if(data?.length) {
  //   count = data?.length;
  // }


  // const handleCheckAnswer = () => {
  //   if( nextQuestion === count - 1 ) {
  //     setFinish(true);
  //   }
  // }

  // const handleAnswer = (answer: string) => {

  //   //@ts-ignore
  //   dispatch({type: "LOAD_QUESTIONS", payload: data[currentQuestion].question})
    
  //   //@ts-ignore
  //   dispatch({ type: "CHECK_ANSWER" })

  //   setFinish(false);
  //   setShowTimer(false);

  //   if( answer && answer === data?.[currentQuestion].correct_answer) {
  //     setScore(score + 1);
  //   }

  //   const next = currentQuestion + 1;
  //   if( nextQuestion < count) {
  //     setCurrentQuestion(next);
  //     setNextQuestion(next);
  //   }

  //   if( nextQuestion === count - 1) {
  //     setFinish(true);
  //   }

  //   setTimeout(() => {
  //     setShowTimer(true);
  //   })
    
  // }

  // const countQuestions = () => {
  //   if (currentQuestion === data?.length) {

  //     return currentQuestion;

  //   } else if (currentQuestion > 0) {
  //     return currentQuestion + 1;
  //   } else {
  //     return 1;
  //   }
  // }

  // const handleTimeUp = () => {
  //   setScore(score + 0);
  //   handleAnswer('');
  // }

  // const scroeCal = () => {
  //   if(score === 0) {
  //     return 'Failed!'
  //   } else {
  //     return 'Congrats!'
  //   }
  // }
  
  return (
    <><div onClick={handleClick}>Click</div></>
  )
}

export default Quiz