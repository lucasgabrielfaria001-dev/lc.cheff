import './index.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Header from './components/Header';
import ProductList from './pages/ProductList';
import Login from './pages/Login';
import Cart from './pages/Cart';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
