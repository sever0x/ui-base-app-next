import React from 'react';
import GridMUI from '@mui/material/Grid';

const Grid = ({
    spacing = 1,
    children
}) => {
    return (
        <GridMUI container spacing={spacing}>
            {children}
        </GridMUI>
    )
}

export default Grid;