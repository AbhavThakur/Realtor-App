import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, db } from '../config/firebase';
export const EmailAuthProvider = async (email, password, name) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed up
      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
        timestamp: serverTimestamp(),
      });

      toast.success('Account created successfully');
      return true;
    })
    .catch((error) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
      // ..
    });
};
