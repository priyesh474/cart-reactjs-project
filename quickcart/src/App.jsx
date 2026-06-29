import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import CartDrawer from './components/CartDrawer/CartDrawer';
import HomePage from './pages/HomePage/HomePage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import SuccessPage from './pages/SuccessPage/SuccessPage';
import './App.css';

export default function App() {
  return (
    <>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </main>
      <CartDrawer />
    </>
  );
}
