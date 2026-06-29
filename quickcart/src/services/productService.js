const BASE_URL = 'https://dummyjson.com/products';
const PAGE_SIZE = 12;

/**
 * Fetch all products (used for home page category grouping)
 */
export async function fetchAllProducts() {
  const res = await fetch(`${BASE_URL}?limit=200&select=id,title,thumbnail,category,price,rating`);
  if (!res.ok) throw new Error('Failed to fetch products');
  const data = await res.json();
  return data.products;
}

/**
 * Fetch paginated products with optional search and category filter
 */
export async function fetchProducts({ search = '', category = 'all', page = 0, minP = '', maxP = '' } = {}) {
  const skip = page * PAGE_SIZE;
  const fields = 'id,title,description,price,thumbnail,rating,category,brand,stock';

  let url;
  if (search.trim()) {
    url = `${BASE_URL}/search?q=${encodeURIComponent(search)}&limit=${PAGE_SIZE}&skip=${skip}&select=${fields}`;
  } else if (category !== 'all') {
    url = `${BASE_URL}/category/${category}?limit=${PAGE_SIZE}&skip=${skip}&select=${fields}`;
  } else {
    url = `${BASE_URL}?limit=${PAGE_SIZE}&skip=${skip}&select=${fields}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch products');
  const data = await res.json();

  let items = data.products || [];
  if (minP !== '') items = items.filter(p => Math.round(p.price * 85) >= Number(minP));
  if (maxP !== '') items = items.filter(p => Math.round(p.price * 85) <= Number(maxP));

  return { products: items, total: data.total || 0 };
}

/**
 * Fetch a single product by ID
 */
export async function fetchProductById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}
