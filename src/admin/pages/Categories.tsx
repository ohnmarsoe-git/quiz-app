import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Category } from '../../types/types';
import useCommonApi from '../../hooks/useCommonApi';

function Categories() {
  const { register, handleSubmit, setValue, resetField } = useForm();

  const [isMode, setIsMode] = useState(0);

  const { data, isLoading, error, makeRequest } =
    useCommonApi<Category>('/api/v1/category');

  const onSubmit = (formData: any) => {
    if (isMode === 0) {
      makeRequest('/api/v1/category', 'POST', formData);
    } else {
      makeRequest(`/api/v1/category/${formData.id}`, 'PATCH', formData);
    }
    resetField('category');
  };

  const delHandle = (id: string) => {
    makeRequest('/api/v1/category', 'DELETE', id);
  };

  const editHandle = (id: string, category: string) => {
    resetField('category');
    setIsMode(1);
    setValue('id', id);
    setValue('category', category);
  };

  if (isLoading) {
    return <div>Loading ....</div>;
  }

  return (
    <section className="bg-gray-5">
      <div className="lg:flex md:flex-row gap-3">
        <div className="lg:w-1/2 md:w-full px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow  md:mt-0 xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                {isMode > 0 ? 'Edit Categories' : 'ADD Categories'}
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  {isMode > 0 && <input {...register('id')} type="hidden" />}

                  <input
                    type="text"
                    {...register('category', {
                      required: true
                    })}
                    id="category"
                    className="bg-gray-50 
                            border border-gray-300 
                            text-gray-900 sm:text-sm 
                            rounded-lg 
                            focus:ring-primary-600 focus:border-primary-600 
                            block w-full p-2.5 
                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=" catgory... ?"
                  />

                  {error && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      This category is already exists!
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="max-w-md text-center inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  {isMode > 0 ? 'EDIT' : 'ADD'}
                </button>
              </form>
            </div>
          </div>
        </div>{' '}
        {/** Add categories form */}
        <div className="lg:w-1/2 md:w-full">
          <h2 className="text-2xl">Categories Lists</h2>
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Category</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {data &&
                  data?.map((res, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="font-medium">{res.category}</span>
                        </div>
                      </td>

                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div
                            className="w-5 mr-3 transform hover:text-purple-500 hover:scale-110"
                            onClick={() => editHandle(res._id, res.category)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </div>
                          <div
                            className="w-5 mr-3 transform hover:text-purple-500 hover:scale-110"
                            onClick={() => delHandle(res._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categories;
