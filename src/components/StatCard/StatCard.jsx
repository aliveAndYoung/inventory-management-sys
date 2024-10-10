import React, { useState } from "react";
import '../../styles/colors.css';

const StatCard = ({ title, value, details }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="p-4 rounded-lg shadow-md relative"
      style={{
        backgroundColor: 'var(--color-card-background)',
        borderColor: 'var(--color-border)',
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <h3 className="text-lg font-semibold mb-2" style={{color: 'var(--color-text-primary)'}}>{title}</h3>
      <p className="text-3xl font-bold" style={{color: 'var(--color-primary)'}}>{value}</p>

      {isHovering && (
        <div className="absolute z-10 rounded-lg shadow-lg p-4 w-64 left-1/2 transform -translate-x-1/2 mt-2"
             style={{
               backgroundColor: 'var(--color-card-background)',
               borderColor: 'var(--color-border)',
               border: '1px solid var(--color-border)',
               boxShadow: '0 4px 6px -1px var(--color-shadow), 0 2px 4px -1px var(--color-shadow)'
             }}>
          <h4 className="font-semibold mb-2" style={{color: 'var(--color-text-primary)'}}>{title} Details</h4>
          <ul className="text-sm" style={{color: 'var(--color-text-secondary)'}}>
            {Array.isArray(details) ? (
              details.map((item, index) => (
                <li key={index} className="mb-1">
                  <span className="font-medium" style={{color: 'var(--color-text-primary)'}}>
                    {item.label}:
                  </span>{" "}
                  {item.value}
                </li>
              ))
            ) : (
              <li className="mb-1">{details}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StatCard;