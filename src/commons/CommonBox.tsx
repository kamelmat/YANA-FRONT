import { Box, BoxProps, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

interface CommonBoxProps extends BoxProps {
  children: ReactNode;
}

const commonBoxStyles: SxProps<Theme> = {
  width: "100%",
  color: "black",
  backgroundColor: "white",
  borderRadius: "0.75rem",
  textTransform: "none",
  padding: "1em",
  height: "4rem",
  display: "flex",
  alignItems: "center",
};

export default function CommonBox({ children, sx, ...rest }: CommonBoxProps) {
  return (
    <Box
      sx={[commonBoxStyles, sx] as SxProps<Theme>}
      {...rest}
    >
      {children}
    </Box>
  );
} 