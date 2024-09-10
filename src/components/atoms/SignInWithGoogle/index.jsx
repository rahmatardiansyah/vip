import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../../../firebase/config';
import { setDoc, doc } from 'firebase/firestore';
import googleLogo from '../../../assets/icons/google.png';

function SignInwithGoogle() {
  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      const user = result.user;
      if (result.user) {
        await setDoc(doc(db, 'Users', user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: ''
        });
        window.location.href = '/';
      }
    });
  }
  return (
    <div className="mt-4">
      <div className="w-[25rem] grid grid-cols-[1fr_230px_1fr] justify-center items-center">
        <span className="bg-gray-500 w-full h-[0.5px]"></span>
        <p className="text-center text-gray-500">Atau login menggunakan</p>
        <span className="bg-gray-500 w-full h-[0.5px]"></span>
      </div>
      <div
        onClick={googleLogin}
        className="w-[25rem] mt-4 px-3 py-2 border rounded cursor-pointer hover:bg-gray-100 flex justify-center items-center"
      >
        <img src={googleLogo} width={30} />
      </div>
    </div>
  );
}
export default SignInwithGoogle;
