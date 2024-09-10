import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth, db } from '../../../firebase/config';
import { setDoc, doc } from 'firebase/firestore';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        await setDoc(doc(db, 'Users', user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: '',
          level: 'user'
        });
      }

      window.location.href = '/';
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h3 className="text-2xl font-semibold">Register</h3>
      <div className="mt-4 flex flex-col">
        <label className="text-base text-gray-800">Nama depan</label>
        <input
          type="text"
          className="py-2 px-3 border border-gray-300 text-black rounded-md sm:w-[25rem] w-full mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          placeholder="First name"
          onChange={(e) => setFname(e.target.value)}
          required
        />
      </div>

      <div className="mt-4 flex flex-col">
        <label className="text-base text-gray-800">Nama belakang</label>
        <input
          type="text"
          className="py-2 px-3 border border-gray-300 rounded-md sm:w-[25rem] w-full mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          placeholder="Last name"
          onChange={(e) => setLname(e.target.value)}
        />
      </div>
      <div className="mt-4 flex flex-col">
        <label className="text-base text-gray-800">Email</label>
        <input
          type="email"
          className="py-2 px-3 border border-gray-300 rounded-md sm:w-[25rem] w-full mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mt-4 flex flex-col">
        <label className="text-base text-gray-800">Password</label>
        <input
          type="password"
          className="py-2 px-3 border border-gray-300 rounded-md sm:w-[25rem] w-full mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="px-3 py-2 bg-green-300 hover:bg-green-400 text-black rounded "
        >
          Register Akun
        </button>
        <p className="mt-2">
          Sudah punya akun silahkan{' '}
          <a className="text-blue-500" href="/login">
            login
          </a>
        </p>
      </div>
    </form>
  );
}
export default RegisterForm;
