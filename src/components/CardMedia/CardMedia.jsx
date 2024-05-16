import React from 'react';
import CardMediaMUI from '@mui/material/CardMedia';

const CardMedia = ({ children, ...restProps }) => {
    return <CardMediaMUI {...restProps}>{children}</CardMediaMUI>;
};

export default CardMedia;