import React from 'react';
import { Dialog, DialogTitle, DialogContent, CircularProgress } from '@mui/material';

const modalContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
};

const loaderStyle = {
  marginBottom: '10px',
};

const messageStyle = {
  marginTop: '10px',
  textAlign: 'center',
  color: '#333',
  fontFamily: 'Arial',
};

function LoadingModal() {
  return (
    <Dialog open>
      <DialogTitle>Loading...</DialogTitle>
      <DialogContent style={modalContentStyle}>
        <CircularProgress style={loaderStyle} size={40} />
        <p style={messageStyle}>Please wait a second while we get things ready...</p>
      </DialogContent>
    </Dialog>
  );
}

export default LoadingModal;
