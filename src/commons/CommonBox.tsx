import { Box } from '@mui/material';
import type { BoxProps, SxProps, Theme } from '@mui/material';
import type { ReactNode } from 'react';

interface CommonBoxProps extends BoxProps {
  children: ReactNode;
}

const commonBoxStyles: SxProps<Theme> = {
  width: "100%",
  color: "black",
  backgroundColor: "white",
  borderRadius: "0.75rem",
  textTransform: "none",
  padding: "0.5em 1em",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
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