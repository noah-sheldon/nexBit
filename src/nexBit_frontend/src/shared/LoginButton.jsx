// src/components/shared/LoginButton.js
import React from 'react';

function LoginButton({ onLogin }) {
  return (
    <button
      onClick={onLogin}
      className="flex items-center px-4 py-2 rounded-lg font-medium text-white"
      style={{
        background: 'linear-gradient(90deg, #5D5FEF, #AE65D8, #ED3DDC)',
      }}
    >
      <img
        src="favicon.ico"
        alt="Internet Identity"
        className="w-5 h-5 mr-2"
      />
      Login
    </button>
  );
}

export default LoginButton;
