import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Questions } from '../../types/types';
import useCommonApi from '../../hooks/useCommonApi';
import BASEAPI from '../../API/config';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import SearchFilter from '../components/SearchFilter';
import QuestionLists from '../components/QuestionLists';
import CategorySelect from '../components/CategorySelect';

type Props = {};

const QuestionsList: React.FC<Props> = () => {
  const api: any = BASEAPI();

  const { data, isLoading, makeRequest } =
    useCommonApi<Questions>('/api/v1/quiz');

  const [keyword, setKeyword] = useState();

  const [filteredItems, setFilteredItems] = useState([]);

  const [flag, setFlag] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const handleDelete = (id: string) => {
    confirmAlert({
      title: '',
      message: 'Are you sure to delete?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => makeRequest('/api/v1/quiz', 'DELETE', id)
        },
        {
          label: 'No'
        }
      ]
    });
  };

  const handleFilter = async (event: any) => {
    const newSearchKeyword = event.target.value;
    const filtered: any = data?.filter((item) => {
      return item.question
        .toLowerCase()
        .includes(newSearchKeyword?.toLowerCase());
    });

    //@ts-ignore
    setKeyword(keyword);
    setFilteredItems(filtered);
  };

  const getFilterBy = (searchQuery: any) => {
    api
      .post('/api/v1/quiz/filterby', JSON.stringify(searchQuery))
      .then((response: any) => {
        const res = response?.data.data;
        setFilteredItems(res);
      });
    setFlag(true);
  };

  const onSearch = (formData: any) => {
    let searchData = {
      category: formData.category,
      level: formData.level
    };
    getFilterBy(searchData);
    setFlag(true);
    reset();
  };

  if (isLoading) return <div>loading ....</div>;

  return (
    <div className="min-w-screen min-h-screen flex justify-center bg-gray-100 font-sans overflow-hidden">
      <div className="w-full lg:w-5/6">
        <h2 className="text-gray-600 uppercase leading lg:text-3xl sm:text-2xl ">
          Javsrcipts - Questions
        </h2>

        <form className="mt-5 md:flex gap-3" onSubmit={handleSubmit(onSearch)}>
          <CategorySelect
            title="category"
            register={register}
            error={errors.category}
          />
          <select
            {...register('level')}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option key={1}>Please Choose Level</option>
            <option key={2} value="Beginner">
              Beginner
            </option>
            <option key={3} value="Intermeidate">
              Intermeidate
            </option>
            <option key={4} value="Difficult">
              Difficult
            </option>
          </select>
          <button
            type="submit"
            className="max-w-md text-center inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
            SEARCH
          </button>
        </form>

        <SearchFilter keyword={keyword} onChange={handleFilter} />

        <div className="bg-white shadow-md rounded my-6 overflow-scroll">
          <table className="min-w-max w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Questions</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Correct Answer</th>
                <th className="py-3 px-6 text-center">Answers</th>
                <th className="py-3 px-6 text-center">Level</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {filteredItems && flag
                ? filteredItems.map((q: any, index: number) => (
                    <React.Fragment key={index}>
                      <QuestionLists
                        index={index}
                        _id={q._id}
                        question={q?.question}
                        category={q.category?.category}
                        level={q.level}
                        answers={q.answers}
                        correct_answer={q.correct_answer}
                        handleDelete={handleDelete}
                      />
                    </React.Fragment>
                  ))
                : data?.map((q: any, index: number) => (
                    <React.Fragment key={index}>
                      <QuestionLists
                        index={index}
                        _id={q._id}
                        question={q?.question}
                        category={q.category?.category}
                        level={q.level}
                        answers={q.answers}
                        correct_answer={q.correct_answer}
                        handleDelete={handleDelete}
                      />
                    </React.Fragment>
                  ))}
              {filteredItems.length <= 0 && flag && (
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td
                    colSpan={6}
                    className="py-3 px-6 text-left whitespace-nowrap"
                  >
                    Recoords Not Found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuestionsList;
