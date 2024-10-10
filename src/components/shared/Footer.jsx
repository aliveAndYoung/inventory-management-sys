import React from 'react';
import '../../styles/colors.css';

const Footer = () => {
  return (
    <footer className="py-4 text-center" 
            style={{ 
              backgroundColor: 'var(--color-card-background)', 
              color: 'var(--color-text-secondary)',
              borderTop: '1px solid var(--color-border)'
            }}>
      <div className="container mx-auto px-4">
        <p className="text-sm">
          Made by{' '}
          <a 
            href="https://github.com/aliveAndYoung" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-medium hover:underline transition duration-300 ease-in-out"
            style={{ color: 'var(--color-primary)' }}
          >
            LifeCouldBeDream
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;