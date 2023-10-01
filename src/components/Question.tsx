import React, {useState} from 'react'

type Props = {
  question?: string;
  answers?: string[];
  correct_answer?: string
  onAnswer: (correct_answer: string) => void;
}

const Question:React.FC<Props> = ({
  question, answers
}) => {

  const [checked, setChecked] = useState(false)

  const handleOnChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
  }


  return (
    <>
      <h3 className='text-3xl mb-3'>{question}</h3>
      <ul className='mb-4'>
        {answers?.map((ans, index) => (
            <li key={index} className="flex p-3 mb-3 bg-slate-400 text-white cursor-pointer">
              <input className={` w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 cursor-pointer ${checked ? 'focus:ring-blue-500 focus:ring-5' : ''}`} type='radio' name={question} onChange={handleOnChange}/>
              <label className="ml-2 mt-px inline-block font-medium text-slate-100">{ans}</label>
            </li>
        ))}
      </ul>
    </>
  )
}

export default Question