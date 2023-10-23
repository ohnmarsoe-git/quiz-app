import React from 'react';
import { User } from '../../types/types';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import useCommonApi from '../../hooks/useCommonApi';
import UserLists from '../components/UserLists';

const Users = () => {
  const { data, isLoading, makeRequest } = useCommonApi<User>('/api/v1/user');

  const handleDelete = (val: string) => {
    confirmAlert({
      title: '',
      message: 'Are you sure to delete?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => makeRequest('/api/v1/user', 'DELETE', val)
        },
        {
          label: 'No'
        }
      ]
    });
  };

  if (isLoading) return <div>loading ....</div>;

  return (
    <div className="min-w-screen min-h-screen flex justify-center bg-gray-100 font-sans overflow-hidden">
      <div className="w-full lg:w-5/6">
        <h2 className="text-gray-600 uppercase leading lg:text-3xl sm:text-2xl ">
          Users Lists
        </h2>

        <form className="mt-5 md:flex gap-3">
          <button
            type="submit"
            className="max-w-md text-center inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
            SEARCH
          </button>
        </form>

        <div className="bg-white shadow-md rounded my-6 overflow-scroll">
          <table className="min-w-max w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-center">Type</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {data?.map((u: any, index: number) => (
                <React.Fragment key={index}>
                  <UserLists
                    id={u._id}
                    index={index}
                    name={`${u.firstName} ${u.lastName} `}
                    email={u.email}
                    role={u.role}
                    type={u.loginType}
                    handleDelete={handleDelete}
                  />
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
