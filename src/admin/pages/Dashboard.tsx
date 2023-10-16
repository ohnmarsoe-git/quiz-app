import React, { useEffect, useState } from 'react';
import BASEAPI from '../../API/config';

type Props = {
  userCount?: number;
  quizCount?: number;
  answerCount?: number;
  answer: string[];
};

const Dashboard = () => {
  const [loading, setLoaing] = useState(true);
  const [answers, setAnswers] = useState<Props | null>(null);

  const api: any = BASEAPI();

  const getAll = async () => {
    await api.get('/api/v1/dashboard/').then((response: any) => {
      const res = response?.data.data;
      setAnswers(res);
      setLoaing(false);
    });
  };

  useEffect(() => {
    getAll();
  }, []);

  if (loading) return <div>loading ....</div>;

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div className="container px-6 py-8 mx-auto">
        <h3 className="text-3xl font-medium text-gray-700">Dashboard</h3>
        <div className="mt-4">
          <div className="flex flex-wrap -mx-6">
            <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
              <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                <div className="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
                  <svg
                    className="w-8 h-8 text-white"
                    viewBox="0 0 28 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                      fill="currentColor"
                    />
                    <path
                      d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                      fill="currentColor"
                    />
                    <path
                      d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                      fill="currentColor"
                    />
                    <path
                      d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                      fill="currentColor"
                    />
                    <path
                      d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                      fill="currentColor"
                    />
                    <path
                      d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">
                    {answers?.userCount}
                  </h4>
                  <div className="text-gray-500">Total Users</div>
                </div>
              </div>
            </div>
            <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
              <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                <div className="p-3 bg-orange-600 bg-opacity-75 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-white"
                    viewBox="0 0 512 512"
                  >
                    <style
                      dangerouslySetInnerHTML={{ __html: 'svg{fill:#ffffff}' }}
                    />
                    <path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z" />
                  </svg>
                </div>
                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">
                    {answers?.quizCount}
                  </h4>
                  <div className="text-gray-500">Total Questions</div>
                </div>
              </div>
            </div>
            <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
              <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                <div className="p-3 bg-pink-600 bg-opacity-75 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    className="w-8 h-8 text-white"
                    viewBox="0 0 448 512"
                  >
                    <style
                      dangerouslySetInnerHTML={{ __html: 'svg{fill:#f7f7f7}' }}
                    />
                    <path
                      d="M432 416h-23.41L277.88 53.69A32 32 0 0 0 247.58 32h-47.16a32 32 0 0 0-30.3 21.69L39.41 416H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-19.58l23.3-64h152.56l23.3 64H304a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM176.85 272L224 142.51 271.15 272z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">
                    {answers?.answerCount}
                  </h4>
                  <div className="text-gray-500">Total Candidates</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8"></div>
        <div className="flex flex-col mt-8">
          <h3 className="text-3xl font-medium text-gray-700 mb-8">
            Latest Candidates
          </h3>
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
                  {answers?.answer &&
                    answers?.answer.map((ans: any, index: number) => (
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
    </main>
  );
};

export default Dashboard;
