// import {Reducer} from 'react'
// import { Question } from '../types/types';

// interface QuizState {
//   questions?: Question[],
//   currentQuestion: number,
//   nextQuestion: number
// }


// export enum ActionEnum {

//   ANSWER = 'ANSWER',
//   COUNT_CURRENT_QUESTION = 'COUNT_CURRENT_QUESTION',
//   CHECK_ANSWER = "CHECK_ANSWER",
//   LOAD_QUESTIONS = "LOAD_QUESTIONS",
//   TIMEUP = "TIMEUP",
//   TOTAL_SCORE = "TOTAL_SCORE"
// }

// type Action = {
//   type: ActionEnum.ANSWER |
//         ActionEnum.COUNT_CURRENT_QUESTION |
//         ActionEnum.CHECK_ANSWER |
//         ActionEnum.LOAD_QUESTIONS |
//         ActionEnum.TIMEUP |
//         ActionEnum.TOTAL_SCORE;
//   payload?: any
// }

// export const initialState:QuizState = {
//   currentQuestion: 0,
//   nextQuestion: 0
// }

// const QuizReducer: Reducer<QuizState, Action> = (state , action) =>  {


//   switch(action.type) {

//     case "LOAD_QUESTIONS":
//       return {
//         ...state,
//         questions: action.payload
//       };
//     case 'CHECK_ANSWER':
//       const correctAnswer = state.questions[state.currentQuestion].correct_answer
//       return {
//         ...state,
        
//       };
//     default:
//       return state;
//   }

//   return state
// }

// export default QuizReducer