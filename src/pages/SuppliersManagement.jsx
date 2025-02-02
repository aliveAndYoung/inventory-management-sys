import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FiEdit, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import { selectIsDarkMode } from '../store/themeSlice';
import { mockSuppliers } from '../mockData/mockSuppliers';
import '../styles/colors.css';

const SuppliersManagement = () => {
  const [suppliers, setSuppliers] = useState(mockSuppliers);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [showForm, setShowForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const isDarkMode = useSelector(selectIsDarkMode);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sortedSuppliers = useMemo(() => {
    let sortableSuppliers = [...suppliers];
    if (sortConfig.key !== null) {
      sortableSuppliers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableSuppliers;
  }, [suppliers, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleDelete = (supplierId) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      setSuppliers(prevSuppliers => prevSuppliers.filter(supplier => supplier.id !== supplierId));
    }
  };

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setShowForm(true);
  };

  const handleAddOrUpdateSupplier = (newSupplier) => {
    if (editingSupplier) {
      setSuppliers(prevSuppliers =>
        prevSuppliers.map(supplier =>
          supplier.id === editingSupplier.id ? { ...supplier, ...newSupplier } : supplier
        )
      );
    } else {
      setSuppliers(prevSuppliers => [...prevSuppliers, { ...newSupplier, id: Date.now() }]);
    }
    setShowForm(false);
    setEditingSupplier(null);
  };

  return (
    <div 
      className={`p-6 min-h-screen transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text-primary)'
      }}
    >
      <h1 className="text-3xl font-bold mb-6">Suppliers Management</h1>
      
      <div className="mb-6">
        <button
          onClick={() => {
            setEditingSupplier(null);
            setShowForm(true);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-text-primary)",
          }}
        >
          <FiPlus className="inline-block mr-2" /> Add Supplier
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
              {['Supplier Name', 'Contact Info', 'Actions'].map((header) => (
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
            {sortedSuppliers.map(supplier => (
              <tr key={supplier.id} className="hover:bg-opacity-50 transition duration-300">
                <td className="px-4 py-2 text-sm font-medium" style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--table-border-color)' }}>
                  {supplier.name}
                </td>
                <td className="px-4 py-2 text-sm" style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--table-border-color)' }}>
                  {supplier.contactInfo}
                </td>
                <td className="px-4 py-2 text-sm" style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--table-border-color)' }}>
                  <button 
                    onClick={() => handleEdit(supplier)}
                    className="text-blue-500 hover:text-blue-600 mr-2 transition duration-300"
                  >
                    <FiEdit />
                  </button>
                  <button 
                    onClick={() => handleDelete(supplier.id)}
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
        <SupplierForm
          onClose={() => {
            setShowForm(false);
            setEditingSupplier(null);
          }}
          onSubmit={handleAddOrUpdateSupplier}
          initialData={editingSupplier}
        />
      )}
    </div>
  );
};

const SupplierForm = ({ onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    contactInfo: initialData?.contactInfo || ''
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
          {initialData ? 'Edit Supplier' : 'Add New Supplier'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Supplier Name"
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
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              placeholder="Contact Info"
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
            {initialData ? 'Update Supplier' : 'Add Supplier'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SuppliersManagement;