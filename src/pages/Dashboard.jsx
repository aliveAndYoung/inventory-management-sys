import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../store/authSlice';
import StatCard from '../components/StatCard/StatCard';
import ActionButtons from '../components/ActionButtons/ActionButtons';
import ProductSalesPieChart from '../components/ProductSalesPieChart/ProductSalesPieChart';
import { dashboardData } from '../mockData/dashboardData';
import { FaExclamationTriangle, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import '../styles/colors.css';

const Dashboard = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const { statCards, lowStockItems, recentStockMovements, productSales } = dashboardData;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getStockLevelColor = (quantity) => {
    if (quantity <= 2) return 'var(--color-error)';
    if (quantity <= 5) return 'var(--color-warning)';
    return 'var(--color-success)';
  };

  const handleAddProduct = () => navigate('/add-product');
  const handleRestockProducts = () => navigate('/restock');
  const handleViewInventory = () => navigate('/inventory');

  return (
    <div 
      className={`min-h-screen p-4 sm:p-6 lg:p-8 transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center" style={{ color: 'var(--color-text-primary)' }}>
          Welcome, {user}
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {statCards.map((card, index) => (
            <StatCard 
              key={index}
              title={card.title}
              value={card.value}
              details={card.details}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          <div className="lg:col-span-2">
            <div className="rounded-lg shadow p-4 sm:p-6" style={{ backgroundColor: 'var(--color-card-background)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Product Sales Distribution</h3>
              <ProductSalesPieChart data={productSales} />
            </div>
          </div>
          <div>
            <div className="rounded-lg shadow p-4 sm:p-6 h-full" style={{ backgroundColor: 'var(--color-card-background)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Recent Stock Movements</h3>
              <div className="overflow-y-auto max-h-64">
                {recentStockMovements.map((movement, index) => (
                  <div 
                    key={movement.id} 
                    className={`flex items-center justify-between p-2 rounded-md mb-2`}
                    style={{ backgroundColor: index % 2 === 0 ? 'var(--color-input-background)' : 'var(--color-card-background)' }}
                  >
                    <div className="flex items-center">
                      {movement.type === 'Restock' 
                        ? <FaArrowUp style={{ color: 'var(--color-success)' }} className="mr-2" />
                        : <FaArrowDown style={{ color: 'var(--color-error)' }} className="mr-2" />
                      }
                      <div>
                        <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{movement.item}</span>
                        <span className="text-sm ml-2" style={{ color: 'var(--color-text-secondary)' }}>
                          {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>{movement.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Low-Stock Alerts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {lowStockItems.map((item) => (
              <div 
                key={item.id} 
                className="rounded-lg shadow p-4 flex flex-col justify-between relative overflow-hidden"
                style={{ backgroundColor: 'var(--color-card-background)' }}
              >
                <div className="flex items-center justify-between mb-2 z-10">
                  <span className="font-medium text-sm truncate" style={{ color: 'var(--color-text-primary)' }}>{item.name}</span>
                  <div className="w-2 h-2 rounded-full" style={{backgroundColor: getStockLevelColor(item.quantity)}}></div>
                </div>
                <div className="flex items-center justify-between z-10">
                  <div>
                    <span className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>{item.quantity}</span>
                    <span className="text-xs ml-1" style={{ color: 'var(--color-text-tertiary)' }}>in stock</span>
                  </div>
                  {item.quantity <= 2 && <FaExclamationTriangle style={{ color: 'var(--color-warning)' }} />}
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-full" style={{ backgroundColor: 'var(--color-input-background)' }}>
                  <div 
                    className="h-full"
                    style={{
                      backgroundColor: getStockLevelColor(item.quantity),
                      width: `${Math.min((item.quantity / 10) * 100, 100)}%`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ActionButtons
          onAddProduct={handleAddProduct}
          onRestockProducts={handleRestockProducts}
          onViewInventory={handleViewInventory}
        />
      </div>
    </div>
  );
};

export default Dashboard;