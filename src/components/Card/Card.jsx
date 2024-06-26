import React from 'react';
import CardMUI from '@mui/material/Card';
import useTheme from 'misc/hooks/useTheme';

const variants = {
  paper: 'paper',
  edit: 'edit',
  error: 'error',
  info: 'info',
  success: 'success',
  warning: 'warning',
};

function Card({
  customBackground,
  children,
  disablePaddings = false,
  variant,
  sx,
}) {
  const { theme } = useTheme();
  return (
    <CardMUI
      sx={{ ...sx }}
    >
      {children}
    </CardMUI>
  );
}

export default Card;
