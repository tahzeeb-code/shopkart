import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const { login, userInfo } = useAuthStore();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (!res.success) {
      setError(res.message);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl text-editorial-noir mb-4">Sign In</h1>
        <p className="text-sm text-editorial-muted">Access your account to manage orders and saved items.</p>
      </div>

      {error && (
        <div className="bg-editorial-crimson/10 text-editorial-crimson p-4 text-sm text-center mb-8">
          {error}
        </div>
      )}

      <form onSubmit={submitHandler} className="space-y-8">
        <div>
          <input
            type="email"
            placeholder="EMAIL ADDRESS"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="PASSWORD"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-primary w-full">
          Sign In
        </button>
      </form>

      <div className="mt-12 text-center text-sm text-editorial-muted">
        Don't have an account?{' '}
        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-editorial-noir hover:text-editorial-crimson transition-colors underline decoration-editorial-gray/50 underline-offset-4">
          Create one
        </Link>
      </div>
    </div>
  );
};

export default Login;
