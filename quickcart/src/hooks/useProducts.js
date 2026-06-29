import { useState, useCallback, useEffect } from 'react';
import { addToCart } from '../features/cart/cartSlice';
import { fetchProducts } from '../services/productService';

/**
 * Custom hook that manages all state and logic for the Products page.
 * Keeps the page component clean — it only handles rendering.
 */
export function useProducts(dispatch) {
  const [products, setProducts]       = useState([]);
  const [total, setTotal]             = useState(0);
  const [page, setPage]               = useState(0);
  const [category, setCategory]       = useState('all');
  const [search, setSearch]           = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [minP, setMinP]               = useState('');
  const [maxP, setMaxP]               = useState('');
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');
  const [addedId, setAddedId]         = useState(null);

  const loadProducts = useCallback(() => {
    setLoading(true);
    setError('');
    fetchProducts({ search, category, page, minP, maxP })
      .then(({ products: items, total: count }) => {
        setProducts(prev => page === 0 ? items : [...prev, ...items]);
        setTotal(count);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load products.');
        setLoading(false);
      });
  }, [search, category, page, minP, maxP]);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  // Reset page & products when filters change
  const resetList = () => { setPage(0); setProducts([]); };

  const handleCategory = (val) => { setCategory(val); resetList(); };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    resetList();
  };

  const handleLoadMore = () => setPage(p => p + 1);

  const handleAdd = (product) => {
    dispatch(addToCart({ ...product, image: product.thumbnail }));
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  // Also reset when price filters change
  const handleMinP = (val) => { setMinP(val); resetList(); };
  const handleMaxP = (val) => { setMaxP(val); resetList(); };

  return {
    products, total, loading, error,
    hasMore: products.length < total,
    category, searchInput, minP, maxP, addedId,
    setSearchInput,
    setMinP: handleMinP,
    setMaxP: handleMaxP,
    handleCategory,
    handleSearch,
    handleLoadMore,
    handleAdd,
  };
}
