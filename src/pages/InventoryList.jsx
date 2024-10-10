import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiChevronDown } from 'react-icons/fi';
import { selectIsDarkMode } from '../store/themeSlice';
import AddProductForm from "../components/AddProductForm/AddProductForm";
import mockProducts from "../mockData/mockProducts";

const InventoryList = () => {
  const [products, setProducts] = useState(mockProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filters, setFilters] = useState({ category: '', supplier: '', stock: '' });
  const [isVisible, setIsVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const isDarkMode = useSelector(selectIsDarkMode);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleAddOrUpdateProduct = (newProduct) => {
    if (editingProduct) {
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === editingProduct.id ? { ...product, ...newProduct } : product
        )
      );
    } else {
      setProducts(prevProducts => [...prevProducts, { ...newProduct, id: Date.now() }]);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const sortedProducts = useMemo(() => {
    let sortableProducts = [...products];
    if (sortConfig.key !== null) {
      sortableProducts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProducts;
  }, [products, sortConfig]);

  const filteredProducts = useMemo(() => {
    return sortedProducts.filter(product => 
      product.category.toLowerCase().includes(filters.category.toLowerCase()) &&
      product.supplier.toLowerCase().includes(filters.supplier.toLowerCase()) &&
      (filters.stock === '' || 
        (filters.stock === 'inStock' && product.stockQuantity > 0) ||
        (filters.stock === 'outOfStock' && product.stockQuantity === 0)
      )
    );
  }, [sortedProducts, filters]);

  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [filteredProducts, currentPage, productsPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const inputStyle = {
    backgroundColor: "var(--color-input-background)",
    borderColor: "var(--color-border)",
    color: "var(--color-text-primary)",
    "--placeholder-color": isDarkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)",
  };

  return (
    <div 
      className={`p-6 transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text-primary)'
      }}
    >
      <h1 className="text-3xl font-bold mb-6">Product Management</h1>
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0 lg:space-x-4">
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
          className="w-full lg:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-text-primary)",
          }}
        >
          <FiPlus className="inline-block mr-2" /> Add Product
        </button>

        <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="w-full sm:w-auto relative">
            <input
              type="text"
              placeholder="Filter by category"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full sm:w-48 p-3 border rounded-lg transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none pl-10"
              style={inputStyle}
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="w-full sm:w-auto relative">
            <input
              type="text"
              placeholder="Filter by supplier"
              name="supplier"
              value={filters.supplier}
              onChange={handleFilterChange}
              className="w-full sm:w-48 p-3 border rounded-lg transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none pl-10"
              style={inputStyle}
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="w-full sm:w-auto relative">
            <select
              name="stock"
              value={filters.stock}
              onChange={handleFilterChange}
              className="w-full sm:w-48 p-3 pr-10 border rounded-lg transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
              style={inputStyle}
            >
              <option value="">All Stock</option>
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out of Stock</option>
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse" style={{
          '--table-border-color': 'rgba(255, 255, 255, 0.2)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'var(--table-border-color)'
        }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--color-card-background)' }}>
              {['Product Name', 'Category', 'Supplier', 'Stock Quantity', 'Price', 'Actions'].map((header, index) => (
                <th key={index} 
                    className="px-4 py-2 font-bold text-sm uppercase tracking-wider cursor-pointer hover:bg-opacity-80 transition duration-300"
                    style={{ 
                      borderWidth: '1px', 
                      borderStyle: 'solid', 
                      borderColor: 'var(--table-border-color)',
                      textAlign: 'center',
                      verticalAlign: 'middle'
                    }}
                    onClick={() => header !== 'Actions' && requestSort(header.toLowerCase().replace(' ', ''))}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentProducts.map(product => (
              <tr key={product.id} className="hover:bg-opacity-50 transition duration-300">
                {['name', 'category', 'supplier', 'stockQuantity', 'price', 'actions'].map((field, index) => (
                  <td key={index}
                      className="px-4 py-2 text-sm font-medium"
                      style={{ 
                        borderWidth: '1px', 
                        borderStyle: 'solid', 
                        borderColor: 'var(--table-border-color)',
                        textAlign: 'center',
                        verticalAlign: 'middle'
                      }}
                  >
                    {field === 'price' ? `$${product[field].toFixed(2)}` :
                     field === 'actions' ? (
                      <div className="flex justify-center items-center">
                        <button 
                          className="text-blue-500 hover:text-blue-600 mr-2 transition duration-300"
                          onClick={() => handleEdit(product)}
                        >
                          <FiEdit />
                        </button>
                        <button 
                          className="text-red-500 hover:text-red-600 transition duration-300"
                          onClick={() => handleDelete(product.id)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                     ) : product[field]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center">
        {[...Array(Math.ceil(filteredProducts.length / productsPerPage)).keys()].map(number => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={`mx-1 px-3 py-1 rounded transition duration-300 ease-in-out
                        ${currentPage === number + 1 
                          ? 'bg-blue-500 text-white' 
                          : isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            style={{
              backgroundColor: currentPage === number + 1 ? 'var(--color-primary)' : 'var(--color-card-background)',
              color: currentPage === number + 1 ? 'var(--color-text-primary)' : 'var(--color-text-secondary)'
            }}
          >
            {number + 1}
          </button>
        ))}
      </div>

      {showForm && (
        <AddProductForm
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          onSubmit={handleAddOrUpdateProduct}
          initialData={editingProduct}
        />
      )}
    </div>
  );
};

export default InventoryList;