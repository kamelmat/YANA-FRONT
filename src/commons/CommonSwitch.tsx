import { Switch, SwitchProps } from '@mui/material';
import theme from '../theme';

const isSpanish = navigator.language.includes('es');

const commonSwitchStyles = {
  width: "4.5rem",
  height: "2rem",
  padding: 0,
  borderRadius: "1rem",
  "& .MuiSwitch-switchBase": {
    color: "white",
    padding: "0.25rem",
    "&.Mui-checked": {
      color: "white",
      transform: "translateX(2.5rem)",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.colors.lightBlue,
        opacity: 1,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: "1.5rem",
    height: "1.5rem",
    boxShadow: "none",
  },
  "& .MuiSwitch-track": {
    backgroundColor: "#ccc",
    opacity: 1,
    borderRadius: "1rem",
    position: "relative",
    "&::before": {
      content: isSpanish ? '"Sí"' : '"Yes"',
      position: "absolute",
      left: "0.5rem",
      top: "50%",
      transform: "translateY(-50%)",
      color: "black",
      fontSize: "0.75rem",
    },
    "&::after": {
      content: '"No"',
      position: "absolute",
      right: "0.5rem",
      top: "50%",
      transform: "translateY(-50%)",
      color: "black",
      fontSize: "0.75rem",
    },
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