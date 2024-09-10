import LoginForm from '../../components/molekul/LoginForm';
import SignInwithGoogle from '../../components/atoms/SignInWithGoogle/index';

const Login = () => {
  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <LoginForm />
      <SignInwithGoogle />
    </div>
  );
};

export default Login;
