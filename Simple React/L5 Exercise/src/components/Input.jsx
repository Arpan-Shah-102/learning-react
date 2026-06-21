import { useState } from 'react';
import './Input.css';

export function Input({ type }) {
  const inputName = type[0].toUpperCase() + type.slice(1);
  const [showPassword, setShowPassword] = useState(false);

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div>
      <input
        placeholder={inputName}
        type={type == 'password' && showPassword ? 'text' : type} 
        className={type}
      />
      {type == 'password' && (
        <button
          onClick={togglePassword}
          className='show-password-button'
        >{showPassword ? 'Hide' : 'Show'}</button>
      )}
    </div>
  );
}