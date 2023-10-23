import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useLogin from '../../hooks/useLogin';

const Login = () => {
  const { onerrors, onSubmit } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  return (
    <>
      <section className="bg-gray-5">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Login
              </h1>

              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: true,
                      pattern: {
                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                        message: 'Email is not valid.'
                      }
                    })}
                    className="bg-gray-50 border 
                             border-gray-300 
                             text-gray-900 
                             sm:text-sm rounded-lg 
                             focus:ring-primary-600 focus:border-primary-600 
                             block w-full p-2.5 
                             dark:bg-gray-700 dark:border-gray-600 
                             dark:placeholder-gray-400 dark:text-white 
                             dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
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
                  {onerrors?.email && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      {onerrors?.email}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    {...register('password', {
                      required: true,
                      minLength: 6
                    })}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />

                  {errors.password && errors.password.type === 'required' && (
                    <p className="text-red-500 text-sm mt-1">
                      Password is required.
                    </p>
                  )}

                  {errors.password && errors.password.type === 'minLength' && (
                    <p className="text-red-500 text-sm mt-1">
                      Password should be at-least 6 characters.
                    </p>
                  )}

                  {onerrors?.password && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      {onerrors?.password}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    {/* <div className="flex items-center h-5">
                                 <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                               </div>
                               <div className="ml-3 text-sm">
                                 <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                 </div> */}
                  </div>
                  <Link
                    to="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="
                         w-full
                         inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
