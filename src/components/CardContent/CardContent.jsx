import React from 'react';
import {CardContent as CardContentMUI} from "@mui/material";

const CardContent = ({ children, p = 2, ...restProps }) => {
  return (
      <CardContentMUI p={p} {...restProps}>
        {children}
      </CardContentMUI>
  );
};

export default CardContent;