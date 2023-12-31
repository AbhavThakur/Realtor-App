import { useState } from 'react';
import { toast } from 'react-toastify';

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { FormButton, OAuth } from '../components';
import { EmailAuthProvider } from '../hooks/AuthProvider';

function SignUp() {
  const [FormData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const { name, email, password } = FormData;

  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (!email.includes('@')) {
      toast.error('Please enter a valid email');
      return;
    }
    await EmailAuthProvider(email, password, name)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        // Handle sign-up failure
        // You can display an error message or take any other necessary action
        console.error(error);
      });
  }
  return (
    <section>
      <h1 className={'Header'}>Sign Up</h1>
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
              type="text"
              id="name"
              value={name}
              placeholder="Name"
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6"
              onChange={(e) =>
                setFormData({ ...FormData, name: e.target.value })
              }
            />
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Email address"
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6"
              onChange={(e) =>
                setFormData({ ...FormData, email: e.target.value })
              }
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                id="password"
                value={password}
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6"
                onChange={(e) =>
                  setFormData({ ...FormData, password: e.target.value })
                }
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
            {/*  */}
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p>
                Have an account?{' '}
                <Link
                  to="/sign-in"
                  className="text-red-600 hover:text-red-800 transition duration-200 ease-in-out"
                >
                  Sign In
                </Link>
              </p>
              <p>
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Forgot Password?
                </Link>
              </p>
            </div>
            {/*  */}
            {/* Sign in button */}
            <FormButton title="Sign Up" />
            {/*  */}
          </form>
          {/* Or container */}
          <div className="flex items-center my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
            <p className="text-center font-semibold mx-4">OR</p>
          </div>
          {/* Sign in with google */}
          <OAuth navigate={navigate} />
        </div>
      </div>
    </section>
  );
}

export default SignUp;
