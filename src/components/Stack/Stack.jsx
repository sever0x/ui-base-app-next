import React from 'react';
import StackMUI from '@mui/material/Stack';

const directions = {
    column: 'column',
    row: 'row',
}

const justifyContent = {
    flexStart: 'flex-start',
    center: 'center',
    flexEnd: 'flex-end',
    spaceBetween: 'space-between',
    spaceAround: 'space-around',
    spaceEvenly: 'space-evenly',
}

const Stack = ({
    children,
    direction = directions.row,
    spacing = 1,
    pb,
    sx,
    justifyContent,
    ...restProps
}) => {
    return (
      <StackMUI direction={direction} spacing={spacing} pb={pb} justifyContent={justifyContent} sx={{...sx}} {...restProps}>
          {children}
      </StackMUI>
    );
}

export default Stack;