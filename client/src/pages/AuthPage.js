import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

export const AuthPage = () => {
  const auth = useContext(AuthContext);

  const { loading, request, error, clearError } = useHttp();

  const message = useMessage();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        <h1>Short the Link</h1>
        <div className='card blue darken-1'>
          <div className='card-content white-text'>
            <span className='card-title'>Authorization</span>
            <div>
              <div className='input-field'>
                <input
                  id='email'
                  type='text'
                  placeholder='Enter your email'
                  name='email'
                  className='yellow-input'
                  onChange={changeHandler}
                />
                <label htmlFor='email'>Email</label>
              </div>
              <div className='input-field'>
                <input
                  id='password'
                  type='password'
                  placeholder='Enter your password'
                  name='password'
                  className='yellow-input'
                  onChange={changeHandler}
                />
                <label htmlFor='password'>Password</label>
              </div>
            </div>
          </div>
          <div className='card-action'>
            <button
              disabled={loading}
              className='btn yellow darken-4'
              style={{ marginRight: 10 }}
              onClick={loginHandler}
            >
              Login
            </button>
            <button
              disabled={loading}
              onClick={registerHandler}
              className='btn grey lighten-1 black-text'
            >
              Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
