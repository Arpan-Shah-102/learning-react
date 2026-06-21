import { Input } from './Input';
import './LoginForm.css';

export function LoginForm() {
  return (
    <>
      <Input type="email" />
      <Input type="password" />
      <div className='buttons'>
        <button>Login</button>
        <button>Sign up</button>
      </div>
    </>
  );
}