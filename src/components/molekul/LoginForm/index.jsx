import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../../firebase/config';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = '/';
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-2xl font-semibold">Login</h3>

      <div className="mt-4 flex flex-col">
        <label className="text-base text-gray-800">Alamat Email</label>
        <input
          type="email"
          className="py-2 px-3 border border-gray-300 text-black rounded-md sm:w-[25rem] w-full mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mt-4 flex flex-col">
        <label>Password</label>
        <input
          type="password"
          className="py-2 px-3 border border-gray-300 rounded-md sm:w-[25rem] w-full mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="px-3 py-2 bg-green-300 hover:bg-green-400 text-black rounded "
        >
          Login Akun
        </button>
      </div>
      <p className="mt-2">
        Belum punya akun silahkan{' '}
        <a className="text-blue-500" href="/register">
          register
        </a>
      </p>
    </form>
  );
}

export default LoginForm;
