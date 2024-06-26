import React from 'react';
import BoxMUI from '@mui/material/Box';

const Box = ({
     children,
     height,
     width,
     my,
     display,
     alignItems,
     gap,
     p,
     sx,
     ...restProps
 }) => {
    return (
        <BoxMUI
            height={height}
            width={width}
            my={my}
            display={display}
            alignItems={alignItems}
            gap={gap}
            p={p}
            sx={{ ...sx }}
            {...restProps}
        >
            {children}
        </BoxMUI>
    );
};

export default Box;