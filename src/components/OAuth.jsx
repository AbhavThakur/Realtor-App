import { FcGoogle } from 'react-icons/fc';

function OAuth() {
  return (
    <button className="flex items-center justify-center w-full bg-red-700 text-white p-4 uppercase text-sm font-medium hover:bg-red-800 transition shadow-md hover:shadow-lg active:shadow-lg">
      <FcGoogle className="text-2xl bg-white rounded-full mr-2" />
      Continue with Google
    </button>
  );
}

export default OAuth;
