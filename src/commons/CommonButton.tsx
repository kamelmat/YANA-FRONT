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
        padding: 0,
        borderRadius: '35px',
        color: isPrimary ? 'black' : theme.colors.lightBlue,
        backgroundColor: isPrimary ? "#fff" : 'transparent',
        borderColor: !isPrimary ? theme.colors.lightBlue : undefined,
        '&:hover': {
          backgroundColor: isPrimary
            ? theme.colors.lightGray
            : `${theme.colors.lightBlue}20`,
        },
        ...rest.sx,
      }}
      variant={isPrimary ? 'contained' : 'outlined'}
    >
      <span style={{ padding: '1em 0' }}>{text}</span>
    </Button>
  );
}
