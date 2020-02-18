import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';

export const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState('');

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request(
          '/api/link/generate',
          'POST',
          {
            from: link
          },
          {
            authorization: `Bearer ${auth.token}`
          }
        );
        history.push(`/detail/${data.link._id}`);
      } catch (e) {}
    }
  };

  return (
    <div className='row'>
      <div className='col s8 offset-s2' style={{ paddingTop: '2rem' }}>
        <div className='input-field'>
          <input
            type='text'
            placeholder='Input Link'
            id='link'
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor='link'>Enter the Link</label>
        </div>
      </div>
    </div>
  );
};
