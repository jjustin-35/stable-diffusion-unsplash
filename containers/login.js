import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { authActions } from '@/redux/slices/auth';

const isExist = (obj) => {
  return Object.keys(obj).length > 0;
};

const LoginContainer = () => {
  const router = useRouter();
  const { user, isLogin, isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogin = ({ email, password }) => {
    dispatch(authActions.postSignIn({ email, password }));
  };

  const handleLoginWithGoogle = () => {
    dispatch(authActions.postGoogleSignIn());
  }

  useEffect(() => {
    if (isExist(user) && isLogin) {
      router.push('/');
    }
  }, [user, isLogin]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.error_message}</p>}
      {!user && <button onClick={loginWithGoogle}>Login with Google</button>}
      {user && <button onClick={logout}>Logout</button>}
    </div>
  );
};

export default LoginContainer;
