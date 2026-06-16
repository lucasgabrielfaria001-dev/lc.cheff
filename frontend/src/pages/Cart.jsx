import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

export default function Cart() {
  const { items, total } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Carrinho Vazio</h1>
        <p className="text-gray-600 mb-6">Você não tem nenhum item no carrinho</p>
        <Link to="/" className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
          Continuar Comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>

      <div className="grid grid-cols-3 gap-8">
        {/* Itens */}
        <div className="col-span-2">
          {items.map((item) => (
            <div key={item.id} className="border rounded p-4 mb-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-gray-600">R$ {item.price}</p>
              </div>
              <div>
                <span className="mr-4">Qtd: {item.quantity}</span>
                <button className="text-red-600 hover:text-red-800">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Resumo */}
        <div className="border rounded p-6 bg-gray-50 h-fit">
          <h2 className="font-bold text-xl mb-4">Resumo</h2>
          <div className="mb-4">
            <p className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>R$ {total.toFixed(2)}</span>
            </p>
            <p className="flex justify-between mb-2">
              <span>Frete:</span>
              <span>R$ 15.00</span>
            </p>
            <hr className="my-2" />
            <p className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>R$ {(total + 15).toFixed(2)}</span>
            </p>
          </div>

          {user ? (
            <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 mb-2">
              Finalizar Compra
            </button>
          ) : (
            <Link to="/login" className="block w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 text-center mb-2">
              Fazer Login
            </Link>
          )}

          <Link to="/" className="block w-full border text-center py-2 rounded hover:bg-gray-100">
            Continuar Comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
