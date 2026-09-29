// Product helpers shared by the catalog, product detail and cart.

// Popularity is stored as 0-100; customers see a 0-5 star rating.
export const popularityToRating = (popularity = 0) =>
  Math.round((Math.min(Math.max(popularity, 0), 100) / 20) * 10) / 10;

export const LOW_STOCK_THRESHOLD = 10;

export const getStockStatus = (stock = 0) => {
  if (stock <= 0) return { key: 'out', label: 'Out of stock' };
  if (stock <= LOW_STOCK_THRESHOLD) return { key: 'low', label: `Only ${stock} left` };
  return { key: 'in', label: 'In stock' };
};

// First gallery image, falling back to the thumbnail.
export const getProductImages = (product) => {
  const gallery = (product?.imagenes ?? []).filter(Boolean);
  if (gallery.length > 0) return gallery;
  return product?.url_imagen ? [product.url_imagen] : [];
};
