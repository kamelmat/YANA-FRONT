import { Box, Button } from '@mui/material';
import type { ButtonProps } from '@mui/material';
import type { ReactNode } from 'react';
import { darken } from '@mui/material/styles';
import theme from '../theme';
import useScreenSize from '../hooks/useScreenSize';
import type { SxProps, Theme } from '@mui/material';

type VariantType = 'primary' | 'secondary' | 'square-primary' | 'square-secondary' | 'cancel' | 'secondary-fill' | 'cancel-fill' | 'square-cancel';
type IconPosition = 'start' | 'end';

interface CustomButtonProps extends ButtonProps {
  variantType?: VariantType;
  icon?: ReactNode;
  text: string;
  iconPosition?: IconPosition;
}

export default function CustomButton({
  variantType = 'primary',
  icon,
  text,
  iconPosition = 'start',
  ...rest
}: CustomButtonProps) {
  const isSquare = variantType.includes('square');
  const screenSize = useScreenSize();

  // Base styles for all buttons
  const baseStyles: SxProps<Theme> = {
    textTransform: 'none',
    fontWeight: '600',
    padding: isSquare ? '0 1.5em' : '0',
    borderRadius: isSquare ? '10px' : '35px',
    transition: 'all 0.2s ease-in-out',
    boxShadow: 'none',
    '&:disabled': {
      opacity: 0.6,
      transform: 'none',
    },
  };

  // Variant-specific styles
  const variantStyles: Record<VariantType, SxProps<Theme>> = {
    primary: {
      color: 'black',
      backgroundColor: '#fff',
      '&:hover': {
        backgroundColor: theme.colors.lightGray,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      },
    },
    secondary: {
      color: theme.colors.lightBlue,
      backgroundColor: 'transparent',
      border: `2px solid ${theme.colors.lightBlue}`,
      '&:hover': {
        backgroundColor: `${theme.colors.lightBlue}15`,
        borderColor: darken(theme.colors.lightBlue, 0.1),
      },
    },
    'square-primary': {
      color: 'black',
      backgroundColor: '#fff',
      '&:hover': {
        backgroundColor: theme.colors.lightGray,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      },
    },
    'square-secondary': {
      color: theme.colors.lightBlue,
      backgroundColor: theme.colors.defaultBackground,
      border: `2px solid ${theme.colors.lightBlue}`,
      '&:hover': {
        backgroundColor: `${theme.colors.lightBlue}15`,
        borderColor: darken(theme.colors.lightBlue, 0.1),
      },
    },
    cancel: {
      color: theme.colors.red,
      backgroundColor: 'transparent',
      border: `2px solid ${theme.colors.red}`,
      '&:hover': {
        backgroundColor: `${theme.colors.red}15`,
        borderColor: darken(theme.colors.red, 0.1),
      },
    },
    'secondary-fill': {
      color: '#fff',
      backgroundColor: theme.colors.lightBlue,
      '&:hover': {
        backgroundColor: darken(theme.colors.lightBlue, 0.1),
      },
    },
    'cancel-fill': {
      color: '#fff',
      backgroundColor: theme.colors.red,
      '&:hover': {
        backgroundColor: darken(theme.colors.red, 0.25),
      },
    },
    'square-cancel': {
      color: theme.colors.lightPink,
      backgroundColor: theme.colors.defaultBackground,
      border: `2px solid ${theme.colors.red}`,
      '&:hover': {
        backgroundColor: `${theme.colors.red}50`,
      },
    },
  };

  return (
    <Button
      fullWidth
      {...rest}
      sx={[
        baseStyles,
        variantStyles[variantType],
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx])
      ]}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent={icon && iconPosition === 'end' ? 'space-between' : 'center'}
        width="100%"
        padding={screenSize === "lg" ? "0.75em 0" : "1em 0"}
        gap={icon ? '0.75em' : 0}
        flexDirection={iconPosition === 'end' ? 'row-reverse' : 'row'}
      >
        {icon && (
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)'
              }
            }} 
            component="span"
          >
            {icon}
          </Box>
        )}
        <span style={{ 
          fontSize: screenSize === "lg" ? "1rem" : "0.9rem",
          letterSpacing: "0.5px",
          fontWeight: 600
        }}>
          {text}
        </span>
      </Box>
    </Button>
  );
}
