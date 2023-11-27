import { FcGoogle } from 'react-icons/fc';
import { GoogleAuth } from './AuthProvider';

function OAuth({ navigate }) {
  return (
    <button
      type="button"
      onClick={() => GoogleAuth().then(() => navigate('/'))}
      className="flex items-center justify-center w-full rounded bg-red-700 text-white p-4 uppercase text-sm font-medium hover:bg-red-800 transition shadow-md hover:shadow-lg active:shadow-lg"
    >
      <FcGoogle className="text-2xl bg-white rounded-full mr-2" />
      Continue with Google
    </button>
  );
}

export default OAuth;
