import React from 'react';
import { Snackbar as MuiSnackbar } from '@mui/material';

const Snackbar = ({ open, message, onClose, autoHideDuration = 6000 }) => {
    return (
        <MuiSnackbar
            open={open}
            message={message}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
        />
    );
};

export default Snackbar;