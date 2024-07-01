import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputForm from '../components/InputForm';
import '../styles/Inputstyle.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  return (
    <>
      <div className="register-form">
        <div className='title'>Create An Account</div><br /><br />

        <InputForm
          htmlFor="Fullname"
          type={'text'}
          value={fullname}
          placeholder={'Fullname'}
          name={'Fullname'}
          handleChange={(e) => setFullname(e.target.value)}
        />


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

        <div className='radio-container'>
          <label>
            <input
              type="radio"
              name="Role"
              value="employee"
              checked={role === 'employee'}
              onChange={(e) => setRole(e.target.value)}
            />
            Register as Employee

          </label>
          <label>
            <input
              type="radio"
              name="Role"
              value="admin"
              checked={role === 'admin'}
              onChange={(e) => setRole(e.target.value)}
            />
            Register as Admin
          </label>
        </div>

        <button className='regis-but' onClick={''}>SIGN UP</button>

        <p>Already have an Account?<Link to={'/'}> Login Here</Link></p>
      </div>

    </>
  )
}

export default Register