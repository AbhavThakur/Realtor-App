import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, db } from '../config/firebase';

const provider = new GoogleAuthProvider();
export const EmailAuthProvider = async (email, password, name) => {
  // try {
  //   const userCredential = await signInWithEmailAndPassword(
  //     auth,
  //     email,
  //     password
  //   );
  //   const user = userCredential.user;
  //   updateProfile(auth.currentUser, {
  //     displayName: name,
  //   });
  //   await setDoc(doc(db, 'users', user.uid), {
  //     name: name,
  //     email: email,
  //     timestamp: serverTimestamp(),
  //   });
  //   toast.success('Sign in successful');
  //   return user;
  // } catch (error) {
  //   const errorMessage = error.message;
  //   toast.error(errorMessage);
  // }
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
      return user;
    })
    .catch((error) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
    });
};

export const SignOut = async () => {
  await auth.signOut();
  toast.success('Sign out successful');
};

export const EmailSignIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      // const user = userCredential.user;
      toast.success('Sign in successful');
    })
    .catch((error) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
    });
};

export const ForgotPasswordProvider = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success('Password reset email sent');
  } catch (error) {
    const errorMessage = error.message;
    toast.error(errorMessage);
  }
};

export const GoogleAuth = async () => {
  await signInWithPopup(auth, provider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      // check for existing user
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        // set user data
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }

      // ...
      toast.success('Sign in successful');
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      // const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      toast.error(errorMessage);
      // ...
    });
};
