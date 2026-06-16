import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { FaShoppingCart, FaUser, FaFootballBall } from 'react-icons/fa';

export default function Header() {
  const { user } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-red-600 text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <FaFootballBall /> FutShop
        </Link>

        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-gray-200">
            Catálogo
          </Link>

          <Link to="/cart" className="flex items-center gap-1 hover:text-gray-200">
            <FaShoppingCart /> ({items.length})
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <span>{user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-white text-red-600 px-4 py-1 rounded hover:bg-gray-200"
              >
                Sair
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-1 hover:text-gray-200">
              <FaUser /> Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
