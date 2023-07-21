import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/shezlong-logo.svg';

function SignLogo() {
  return (
    <>
      <div className="text-center">
        <Link to="/">
          <img width="70%" src={logo} alt="/" />
        </Link>
      </div>
    </>
  );
}

export default SignLogo;
