import React from 'react';
import { FaPlus, FaBoxes, FaListAlt } from 'react-icons/fa';
import '../../styles/colors.css';

const ActionButton = ({ icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50"
    style={{
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-card-background)',
    }}
  >
    {icon}
    <span className="ml-2">{text}</span>
  </button>
);

const ActionButtons = ({ onAddProduct, onRestockProducts, onViewInventory }) => {
  return (
    <div className="mt-8 rounded-lg p-4"
         style={{
           backgroundColor: 'var(--color-input-background)',
           borderColor: 'var(--color-border)',
         }}>
      <h3 className="text-lg font-semibold mb-4 text-center" style={{color: 'var(--color-text-primary)'}}>Quick Actions</h3>
      <div className="flex flex-wrap justify-center gap-4">
        <ActionButton
          icon={<FaPlus className="w-5 h-5" />}
          text="Add New Product"
          onClick={onAddProduct}
        />
        <ActionButton
          icon={<FaBoxes className="w-5 h-5" />}
          text="Restock Products"
          onClick={onRestockProducts}
        />
        <ActionButton
          icon={<FaListAlt className="w-5 h-5" />}
          text="View Full Inventory"
          onClick={onViewInventory}
        />
      </div>
    </div>
  );
};

export default ActionButtons;