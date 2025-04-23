import { Switch } from '@mui/material';
import type { SwitchProps } from '@mui/material';
import theme from '../theme';

const commonSwitchStyles = {
  width: '3.5rem',
  height: '2rem',
  padding: 0,
  borderRadius: '1rem',
  '& .MuiSwitch-switchBase': {
    color: 'white',
    padding: '0.25rem',
    '&.Mui-checked': {
      color: 'white',
      transform: 'translateX(1.5rem)',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.colors.lightBlue,
        opacity: 1,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: '1.5rem',
    height: '1.5rem',
    boxShadow: 'none',
  },
  '& .MuiSwitch-track': {
    backgroundColor: '#ccc',
    opacity: 1,
    borderRadius: '1rem',
  },
};

export default function CommonSwitch({ sx, ...rest }: SwitchProps) {
  return (
    <Switch
      sx={{
        ...commonSwitchStyles,
        ...sx,
      }}
      {...rest}
    />
  );
}
