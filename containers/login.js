import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';

const LoginContainer = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!user && <button onClick={loginWithGoogle}>Login with Google</button>}
      {user && <button onClick={logout}>Logout</button>}
    </div>
  );
};

export default LoginContainer;
