const Cart = ({ imageUrl, number }) => {
    return (
      <div
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          display: 'flex',
          alignItems: 'center',
          transition: 'transform 0.3s ease',
          cursor: 'pointer',
          backgroundColor: 'white',
          width: '120px',
          height: '60px',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: 'none',
          zIndex: '9999',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
          e.currentTarget.style.backgroundColor = '#1976d2';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.backgroundColor = 'white';
        }}
      >
        <div style={{ width: '40%', paddingRight: '10px' }}>
          <img src={imageUrl} alt="Product" style={{ width: '100%' }} />
        </div>
        <div
          style={{
            width: '50px',
            height: '40px',
            borderRadius: '40%',
            backgroundColor: '#1976d2',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
          }}
        >
          {number}
        </div>
      </div>
    );
  };
  
  export default Cart;
  