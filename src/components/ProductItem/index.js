import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import ItemActions from "./ItemActions";
import Link from 'next/link';

const FloatingButton = ({ onClick }) => {
  if (!onClick) {
    return null; // Don't render anything if onClick prop is not provided
  }

  return (
    <button
      className="floating-button"
      onClick={onClick}
      style={{
        position: 'absolute',
        top: '8px',
        right: '8px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 999, // Ensure it appears above other elements
        transition: 'background-color 0.3s', // Add transition for smooth effect
        fontSize: '36px', // Make the "+" sign big
        color: '#ffffff', // Set the color to white
      }}
      // Apply hover effect by changing the background color to orange
      onMouseEnter={(e) => (e.target.style.backgroundColor = 'orange')}
      onMouseLeave={(e) => (e.target.style.backgroundColor = '#ffffff')}
    >
      +
    </button>
  );
};

const AdminProductItem = ({ id, imageUrl, name, price, onEdit, onDelete, CartHandler }) => {
  const maxNameLength = 75;
  const [isHovered, setIsHovered] = useState(false);

  const truncatedName = name.length > maxNameLength ? `${name.substring(0, maxNameLength)}...` : name;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <div
        className={`product-item ${isHovered ? 'hovered' : ''}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '8px',
          borderRadius: '8px',
          maxWidth: '220px', //
          margin: '0 auto', // Center the component horizontally
          transition: 'box-shadow 0.3s ease', // Add transition for hover effect
          cursor: 'pointer', // Change cursor to pointer on hover
          position: 'relative', // Enable positioning for the floating button
          boxShadow: isHovered ? '0 0 10px rgba(0, 0, 0, 0.3)' : 'none', // Apply box-shadow on hover
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link href={`/product/${id}`}>
          <div
            style={{
              width: '100%',
              paddingBottom: '56.25%',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '8px',
            }}
          >
            <img
              src={imageUrl}
              alt={name}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'auto',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        </Link>

        <Typography variant="h6" gutterBottom style={{ fontFamily: 'serif', fontSize: '18px', color: 'orange', lineHeight: '1.2' }}>
          <Link href={`/product/${id}`}>
            {truncatedName}
          </Link>
        </Typography>

        <Typography variant="subtitle1" gutterBottom style={{ fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '20px', color: 'darkorange' }}>
          ${price}
        </Typography>

        {isHovered && (
          <FloatingButton onClick={CartHandler} />
        )}

        <div style={{ marginTop: 'auto' }}>
          <ItemActions
            id={id}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </div>
      </div>
    </Grid>
  );
};

export default AdminProductItem;
