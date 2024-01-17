import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TOKEN_KEY, fetcher } from '../services/fetcher';

const Login = () => {
  const navigate = useNavigate();
  const [ email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      fetcher('/auth/login', 'POST', { email, password })
          .then((token: string) => {
            localStorage.setItem(TOKEN_KEY, token);
            navigate('/');
          })
          .catch(() => alert('invalid login'));
  }

  return (
   <div>
     <nav className='navbar navbar-expand-lg'>
    <div className="container-fluid">
        <h3 className='title'>Login Page</h3>
        <Link className='btn' to='/'>Home</Link>
    </div>
   </nav>
   <main className='container'>
    <section className="row justify-content-center">
      <div className="col-12 col-md-4">
        <form className="form-group border rounded shadow p-4">
          <label htmlFor="email" className='text-white'>Email</label>
          <input className='mb-2 form-control' value={email} onChange={e => setEmail(e.target.value)}/>
          <label htmlFor="password" className='text-white'>Password</label>
          <input className='mb-2 form-control' type='password' value={password} onChange={e => setPassword(e.target.value)}/>
          <button onClick={handleLogin} className='btn'>Login</button>
          <label htmlFor="register" className='text-white'>Dont have an account?</label>
          <Link to='/register'> Register</Link>
        </form>
      </div>
    </section>
   </main>
   </div>
  )
}

export default Login

