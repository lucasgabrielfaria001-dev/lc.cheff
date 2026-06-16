import React, { useEffect, useState } from 'react';
import { productService } from '../services/api';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ category: '', team: '', search: '' });
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    loadProducts();
  }, [filters, page]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.listProducts({ ...filters, page, limit: 12 });
      setProducts(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  if (loading) return <div className="text-center py-8">Carregando...</div>;
  if (error) return <div className="text-red-600 text-center py-8">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Catálogo de Produtos</h1>

      {/* Filtros */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Buscar produto..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="border p-2 rounded"
        />
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Todas as categorias</option>
          <option value="Vestuário">Vestuário</option>
          <option value="Calçados">Calçados</option>
          <option value="Equipamentos">Equipamentos</option>
          <option value="Acessórios">Acessórios</option>
        </select>
        <input
          type="text"
          placeholder="Time..."
          value={filters.team}
          onChange={(e) => setFilters({ ...filters, team: e.target.value })}
          className="border p-2 rounded"
        />
      </div>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
            <img
              src={product.image_url || 'https://via.placeholder.com/200'}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.team || 'Geral'}</p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-2xl font-bold text-red-600">R$ {product.price}</span>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  {product.stock > 0 ? 'Em estoque' : 'Fora de estoque'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <Link to={`/product/${product.id}`} className="text-blue-600 hover:underline">
                  Detalhes
                </Link>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                  className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 disabled:bg-gray-400 flex items-center gap-2"
                >
                  <FaShoppingCart /> Adicionar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
