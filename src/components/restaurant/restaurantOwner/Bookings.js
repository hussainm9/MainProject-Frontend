import React from 'react';

function Bookings() {
  return (
    <div>
      <div>Bookings</div>
      <button onClick={() => handleFilter('pending')}>Pending</button>
      <button onClick={() => handleFilter('approved')}>Approved</button>
      <button onClick={() => handleFilter('rejected')}>Rejected</button>
    </div>
  );

  function handleFilter(filterType) {
    // Handle filter logic here
    console.log(`Filtering by: ${filterType}`);
  }
}

export default Bookings;
