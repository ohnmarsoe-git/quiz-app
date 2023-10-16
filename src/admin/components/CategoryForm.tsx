import React from 'react';
import { useForm } from 'react-hook-form';
import useCommonApi from '../../hooks/useCommonApi';

interface Category {
  _id: string;
  category: string;
  __v?: number;
}

const CategoryForm = (defaultValues: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues
  });

  const { error, makeRequest } = useCommonApi<Category>('/api/v1/category');

  const onSubmit = (formData: any) => {
    makeRequest('/api/v1/category', 'POST', formData);
  };

  return (
    <>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
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
            placeholder=" category... ?"
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
          ADD
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
