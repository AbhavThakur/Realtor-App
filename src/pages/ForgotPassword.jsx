import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormButton } from '../components';
import { ForgotPasswordProvider } from '../components/AuthProvider';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    if (!email) {
      toast.error('Please fill in all fields');
      return;
    }
    ForgotPasswordProvider(email);
  }
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        {/* Image container */}
        <div className="md:w-[67%] lg:w-[50%]  mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="logo"
            className="w-full rounded-2xl"
          />
        </div>
        {/*  */}
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Email address"
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6"
              onChange={(e) => setEmail(e.target.value)}
            />

            {/*  */}
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p>
                Don't have an account?{' '}
                <Link
                  to="/sign-up"
                  className="text-red-600 hover:text-red-800 transition duration-200 ease-in-out"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to="/sign-in"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Sign in instead
                </Link>
              </p>
            </div>
            {/*  */}
            {/* Sign in button */}
            <FormButton title="Send password reset" />
            {/*  */}
          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
