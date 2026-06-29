import Header from './components/Header';
import HomeProducts from './components/HomeProducts';
import CartDrawer from './components/CartDrawer';
import ProductDetail from './components/ProductDetail';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
// import 'bootstrap/dist/css/bootstrap.min.css';
import SuccessPage from './components/SuccessPage';

export default function App() {
  
  return (
    <>
      <Header />
      <main className="main">
        <Routes>

          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<HomeProducts />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/success" element={<SuccessPage />} />

        </Routes>
      </main>

      <CartDrawer />
    </>
  );
}
