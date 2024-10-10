import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const AddProductForm = ({ onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    supplier: '',
    stockQuantity: '',
    price: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        category: initialData.category || '',
        supplier: initialData.supplier || '',
        stockQuantity: initialData.stockQuantity || '',
        price: initialData.price || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      stockQuantity: parseInt(formData.stockQuantity),
      price: parseFloat(formData.price)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full relative"
           style={{ backgroundColor: 'var(--color-card-background)' }}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <FiX size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>
          {initialData ? 'Edit Product' : 'Add New Product'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full p-2 border rounded"
              style={{
                backgroundColor: 'var(--color-input-background)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-primary)'
              }}
              required
            />
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="w-full p-2 border rounded"
              style={{
                backgroundColor: 'var(--color-input-background)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-primary)'
              }}
              required
            />
            <input
              type="text"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              placeholder="Supplier"
              className="w-full p-2 border rounded"
              style={{
                backgroundColor: 'var(--color-input-background)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-primary)'
              }}
              required
            />
            <input
              type="number"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleChange}
              placeholder="Stock Quantity"
              className="w-full p-2 border rounded"
              style={{
                backgroundColor: 'var(--color-input-background)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-primary)'
              }}
              required
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full p-2 border rounded"
              style={{
                backgroundColor: 'var(--color-input-background)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-primary)'
              }}
              step="0.01"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-text-primary)'
            }}
          >
            {initialData ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;