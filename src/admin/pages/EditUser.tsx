import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { User } from '../../types/types';
import useCommonApi from '../../hooks/useCommonApi';

const EditUser = () => {
  const param = useParams();

  const { data, makeRequest } = useCommonApi<User>(
    `/api/v1/user/${param.id}`,
    'GET',
    param.id
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const onSubmit = (formData: any) => {
    //@ts-ignore
    let userInfo;
    //@ts-ignore
    let userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      role: 'user'
    };

    if (formData.password)
      userInfo = { ...userData, password: formData.password };
    else userInfo = userData;

    makeRequest(`/api/v1/user/${param.id}`, 'PATCH', userInfo);
  };

  return (
    <section className="bg-gray-5">
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Edit User
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              {data && (
                <>
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      className="
                            bg-gray-50 border 
                            border-gray-300 
                            text-gray-900 
                            sm:text-sm rounded-lg 
                            focus:ring-primary-600 
                            focus:border-primary-600 
                            block w-full p-2.5 
                            dark:bg-gray-700 
                            dark:border-gray-600 
                            dark:placeholder-gray-400 
                            dark:text-white 
                            dark:focus:ring-blue-500 
                            dark:focus:border-blue-500"
                      placeholder="First Name"
                      {...register('firstName', {
                        required: true,
                        //@ts-ignore
                        value: data?.firstName
                      })}
                    />
                    {errors.firstName?.type === 'required' && (
                      <p className="text-red-500 text-sm mt-1" role="alert">
                        FirstName is required
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      {...register('lastName', {
                        required: true,
                        //@ts-ignore
                        value: data?.lastName
                      })}
                      id="lastName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Last Name"
                    />
                    {errors.lastName?.type === 'required' && (
                      <p className="text-red-500 text-sm mt-1" role="alert">
                        Last Name is required
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      {...register('email', {
                        required: true,
                        //@ts-ignore
                        value: data?.email,
                        pattern: {
                          value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                          message: 'Email is not valid.'
                        }
                      })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.email?.type === 'required' && (
                      <p className="text-red-500 text-sm mt-1" role="alert">
                        Email Address is required
                      </p>
                    )}
                    {errors.email?.type === 'pattern' && (
                      <p className="text-red-500 text-sm mt-1" role="alert">
                        Email is not valid
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="level"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      User Role
                    </label>
                    <input
                      type="radio"
                      {...register('role', {
                        required: true,
                        //@ts-ignore
                        value: data?.role
                      })}
                      id="role1"
                      value="admin"
                      placeholder=""
                      className="mr-1 "
                    />
                    Administrator
                    <input
                      type="radio"
                      {...register('role', {
                        required: true,
                        //@ts-ignore
                        value: data?.role
                      })}
                      id="role2"
                      value="supervisor"
                      placeholder=""
                      className="ml-1 mr-1 "
                    />
                    Supervisor
                    <input
                      type="radio"
                      {...register('role', {
                        required: true,
                        //@ts-ignore
                        value: data?.role
                      })}
                      id="role3"
                      value="user"
                      placeholder=""
                      className="ml-1 mr-1 "
                    />
                    User
                    {errors.role?.type === 'required' && (
                      <p className="text-red-500 text-sm mt-1" role="alert">
                        Role is required
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      {...register('password', {
                        minLength: 6
                      })}
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-grasy-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />

                    {errors.password && errors.password.type === 'required' && (
                      <p className="text-red-500 text-sm mt-1">
                        Password is required.
                      </p>
                    )}
                    {errors.password &&
                      errors.password.type === 'minLength' && (
                        <p className="text-red-500 text-sm mt-1">
                          Password should be at-least 6 characters.
                        </p>
                      )}
                  </div>
                  <div>
                    <label
                      htmlFor="confirm password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      New Confirm Password
                    </label>
                    <input
                      type="password"
                      {...register('confirmPassword', {
                        validate: (val: string) => {
                          if (watch('password') !== val) {
                            return 'Your passwords do no match';
                          }
                        }
                      })}
                      id="confirmPassword"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.confirmPassword &&
                      errors.confirmPassword.type === 'required' && (
                        <p className="text-red-500 text-sm mt-1">
                          Confirm Password is required!
                        </p>
                      )}
                    {errors.confirmPassword &&
                      errors.confirmPassword.type === 'validate' && (
                        <p className="text-red-500 text-sm mt-1">
                          Password do not Match
                        </p>
                      )}
                  </div>

                  <div>
                    <input
                      type="hidden"
                      {...register('page', { value: 'admin' })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  >
                    Edit User
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditUser;
