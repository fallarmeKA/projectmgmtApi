import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputForm from '../components/InputForm';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div className="login-form">
        <div className='title'>Login to Account</div><br /><br />

        <InputForm
          htmlFor="Email"
          type={'email'}
          value={email}
          placeholder={'Email'}
          name={'email'}
          handleChange={(e) => setEmail(e.target.value)}
        />

        <InputForm
          htmlFor="Password"
          type={'password'}
          value={password}
          placeholder={'Enter Your Password'}
          name={'Password'}
          handleChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-but" onClick={'/dashboard'}>LOGIN</button>

        <p>Doesn't have an Account? <Link to={'/Register'}>Create Account</Link></p>
      </div>

    </>
  )
}

export default Login