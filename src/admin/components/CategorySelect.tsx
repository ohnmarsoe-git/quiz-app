import { useEffect, useState } from 'react';
import BASEAPI from '../../API/config';

const CategorySelect = (props: any) => {
  const api: any = BASEAPI();

  const [categories, setCategories] = useState([{}]);

  const getCategories = () => {
    api.get('/api/v1/category').then((response: any) => {
      const res = response?.data.data;
      setCategories(res);
    });
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {
        <select
          {...props.register('category', { required: true })}
          value={props.value}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Please select</option>
          {categories.map((cat: any, index) => (
            <option key={index} value={cat._id}>
              {cat.category}
            </option>
          ))}
        </select>
      }
      {!props.value && props.error?.type === 'required' && (
        <p className="text-red-500 text-sm mt-1">Category is required!</p>
      )}
    </>
  );
};

export default CategorySelect;
