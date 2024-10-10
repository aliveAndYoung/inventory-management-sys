import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FiEdit, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import { selectIsDarkMode } from '../store/themeSlice';
import { mockCategories } from '../mockData/mockCategories';
import '../styles/colors.css';

const CategoriesManagement = () => {
  const [categories, setCategories] = useState(mockCategories);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const isDarkMode = useSelector(selectIsDarkMode);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const sortedCategories = useMemo(() => {
    let sortableCategories = [...categories];
    if (sortConfig.key !== null) {
      sortableCategories.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableCategories;
  }, [categories, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleDelete = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(prevCategories => prevCategories.filter(category => category.id !== categoryId));
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleAddOrUpdateCategory = (newCategory) => {
    if (editingCategory) {
      setCategories(prevCategories =>
        prevCategories.map(category =>
          category.id === editingCategory.id ? { ...category, ...newCategory } : category
        )
      );
    } else {
      setCategories(prevCategories => [...prevCategories, { ...newCategory, id: Date.now() }]);
    }
    setShowForm(false);
    setEditingCategory(null);
  };

  return (
    <div 
      className={`transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text-primary)',
        minHeight: '100vh',
        padding: '1.5rem'
      }}
    >
      <h1 className="text-3xl font-bold mb-6">Categories Management</h1>
      
      <div className="mb-6">
        <button
          onClick={() => {
            setEditingCategory(null);
            setShowForm(true);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-text-primary)",
          }}
        >
          <FiPlus className="inline-block mr-2" /> Add Category
        </button>
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
              {['Category Name', 'Description', 'Actions'].map((header) => (
                <th key={header} 
                    className="px-4 py-2 font-bold text-sm uppercase tracking-wider cursor-pointer hover:bg-opacity-80 transition duration-300"
                    style={{ 
                      borderWidth: '1px', 
                      borderStyle: 'solid', 
                      borderColor: 'var(--table-border-color)',
                      textAlign: 'left',
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
            {sortedCategories.map(category => (
              <tr key={category.id} className="hover:bg-opacity-50 transition duration-300">
                <td className="px-4 py-2 text-sm font-medium" style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--table-border-color)' }}>
                  {category.name}
                </td>
                <td className="px-4 py-2 text-sm" style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--table-border-color)' }}>
                  {category.description}
                </td>
                <td className="px-4 py-2 text-sm" style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--table-border-color)' }}>
                  <button 
                    onClick={() => handleEdit(category)}
                    className="text-blue-500 hover:text-blue-600 mr-2 transition duration-300"
                  >
                    <FiEdit />
                  </button>
                  <button 
                    onClick={() => handleDelete(category.id)}
                    className="text-red-500 hover:text-red-600 transition duration-300"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <CategoryForm
          onClose={() => {
            setShowForm(false);
            setEditingCategory(null);
          }}
          onSubmit={handleAddOrUpdateCategory}
          initialData={editingCategory}
        />
      )}
    </div>
  );
};

const CategoryForm = ({ onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
          {initialData ? 'Edit Category' : 'Add New Category'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Category Name"
              className="w-full p-2 border rounded"
              style={{
                backgroundColor: 'var(--color-input-background)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-primary)'
              }}
              required
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Category Description"
              className="w-full p-2 border rounded"
              style={{
                backgroundColor: 'var(--color-input-background)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-primary)'
              }}
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
            {initialData ? 'Update Category' : 'Add Category'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoriesManagement;