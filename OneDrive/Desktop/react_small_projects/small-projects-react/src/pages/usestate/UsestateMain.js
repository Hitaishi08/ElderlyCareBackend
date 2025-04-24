import React from 'react';
import { Link } from 'react-router-dom';

function UsestateMain() {
  return (
    <div>
      <button><Link to="/counter">Counter</Link></button>
      <button><Link to="/darkmode">Dark Mode</Link></button>
      <button><Link to="/gallery">Image Gallery</Link></button>
      <button><Link to="/cart">Shopping Cart</Link></button>
      <button><Link to="/todo">Todo List</Link></button>
    </div>
  );
}

export default UsestateMain;
