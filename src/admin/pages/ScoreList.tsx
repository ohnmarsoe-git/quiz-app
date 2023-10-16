import React, { useEffect, useState } from 'react';
import BASEAPI from '../../API/config';

type Props = {};

const ScoreList = (props: Props) => {
  const api: any = BASEAPI();

  const [answers, setAnswers] = useState([]);

  const getAll = async () => {
    await api.get('/api/v1/answers/latest').then((response: any) => {
      const res = response?.data.data;
      setAnswers(res);
    });
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="min-w-screen min-h-screen flex justify-center bg-gray-100 font-sans overflow-hidden">
      <div className="w-full lg:w-5/6">
        <h2 className="text-gray-600 uppercase leading lg:text-3xl sm:text-2xl mb-5">
          SCORE LISTS
        </h2>
        <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Category
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {answers &&
                  answers?.map((ans: any, index: number) => (
                    <React.Fragment key={index}>
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img
                                className="w-10 h-10 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium leading-5 text-gray-900">
                                {`${ans?.user?.firstName} ${ans?.user?.lastName}`}
                              </div>
                              <div className="text-sm leading-5 text-gray-500">
                                {ans?.user?.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            {ans?.category?.category}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            {ans?.score}
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreList;
