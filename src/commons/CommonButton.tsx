import { Box, Button, ButtonProps } from '@mui/material';
import { ReactNode } from 'react';
import theme from '../theme';

type VariantType = 'primary' | 'secondary' | 'square-primary' | 'square-secondary' | 'ghost';
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
  const isPrimary = variantType.includes('primary');
  const isSecondary = variantType.includes('secondary');
  const isSquare = variantType.includes('square');
  const isGhost = variantType === 'ghost';

  return (
    <Button
      fullWidth
      startIcon={iconPosition === 'start' ? icon : undefined}
      endIcon={iconPosition === 'end' ? icon : undefined}
      {...rest}
      sx={{
        textTransform: 'none',
        fontWeight: '600',
        padding: isSquare || isGhost ? '0 1em' : '0',
        borderRadius: isSquare ? '10px' : '35px',
        color: isPrimary
          ? 'black'
          : isSecondary
          ? theme.colors.lightBlue
          : theme.colors.lightPink,
        backgroundColor: isPrimary
          ? '#fff'
          : 'transparent',
        borderColor: isSecondary ? theme.colors.lightBlue : undefined,
        border: isSecondary ? '1px solid' : isGhost ? 'none' : undefined,
        '&:hover': {
          backgroundColor: isPrimary
            ? theme.colors.lightGray
            : isSecondary 
            ? `${theme.colors.lightBlue}20`
            : `${theme.colors.lightPink}20`,
        },
        '&:disabled' : {
          backgroundColor: isPrimary ? `${theme.colors.lightGray}90` : '',
        },
        ...rest.sx,
      }}
      variant={isPrimary ? 'contained' : isSecondary ? 'outlined' : 'text'}
    >
      <Box
        display="flex"
        justifyContent={icon ? 'space-between' : 'center'}
        alignItems="center"
        width="100%"
        padding='1em 0'
      >
        <span>{text}</span>
      </Box>
    </Button>
  );
}
