import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { SignOut } from '../hooks/AuthProvider';

function Profile() {
  const navigate = useNavigate();
  const [FormData, setFormData] = useState({
    name: auth.currentUser?.displayName,
    email: auth.currentUser?.email,
  });

  const { name, email } = FormData;
  return (
    <>
      <section className="max-w-6xl mx-auto  flex justify-center items-center flex-col ">
        <h1 className={'Header'}>Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            {/* Name */}
            <input
              value={name}
              type="text"
              id="name"
              disabled
              placeholder="Name"
              className="FormInput"
            />
            {/* Email */}
            <input
              value={email}
              type="email"
              placeholder="Email"
              id="email"
              disabled
              className="FormInput"
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p>
                Do you want to change your name?
                <span className="LinkButton">Edit</span>
              </p>
              <p
                onClick={() => SignOut().then(() => navigate('/'))}
                className="LinkButtonRight"
              >
                Sign out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Profile;
