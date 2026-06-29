import Header from './components/Header';
import HomeProducts from './components/HomeProducts';
import CartDrawer from './components/CartDrawer';

export default function App(){
  return (
    <>
      <Header />
      <main className="main">
        <HomeProducts />
      </main>
      <CartDrawer />
    </>
  );
}
