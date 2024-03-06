import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center">
      <div>
        <h2>Page Not Found</h2>
        <button className='btn btn-primary btn-sm' onClick={() => { navigate('/') }}>Go To Home Page</button>
      </div>
    </div>
  );
}
