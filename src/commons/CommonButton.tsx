import { Button, ButtonProps } from '@mui/material';
import { ReactNode } from 'react';
import theme from '../theme';

type VariantType = 'primary' | 'secondary';

interface CustomButtonProps extends ButtonProps {
  variantType?: VariantType;
  icon?: ReactNode;
  text: string;
}

export default function CustomButton({
  variantType = 'primary',
  icon,
  text,
  ...rest
}: CustomButtonProps) {
  const isPrimary = variantType === 'primary';

  return (
    <Button
      fullWidth
      startIcon={icon}
      {...rest}
      sx={{
        textTransform: 'none',
        fontWeight: 600,
        padding: '1em',
        borderRadius: isPrimary ? '35px' : '30px',
        color: isPrimary ? 'black' : theme.colors.lightBlue,
        backgroundColor: isPrimary ? theme.colors.lightGray : 'transparent',
        borderColor: !isPrimary ? theme.colors.lightBlue : undefined,
        '&:hover': {
          backgroundColor: isPrimary
            ? '#bfbfbf'
            : `${theme.colors.lightBlue}20`,
        },
        ...rest.sx,
      }}
      variant={isPrimary ? 'contained' : 'outlined'}
    >
      {text}
    </Button>
  );
}
