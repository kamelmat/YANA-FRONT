import { TextField, TextFieldProps } from '@mui/material';
import { ChangeEvent } from 'react';
import theme from '../theme';

interface CustomTextFieldProps extends Omit<TextFieldProps, 'value' | 'onChange' | 'label'> {
  label: string;
  value: string;
  setValue: (val: string) => void;
}

export default function CustomTextField({
  label,
  value,
  setValue,
  ...rest
}: CustomTextFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <TextField
      {...rest}
      fullWidth
      label={label}
      value={value}
      onChange={handleChange}
      sx={{
        ...rest.sx,
        "& .MuiOutlinedInput-root": {
          color: theme.colors.lightGray,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.colors.lightGray,
            borderWidth: "1px",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.colors.lightBlue,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.colors.lightBlue,
          },
        },
        "& .MuiInputLabel-root": {
          color: theme.colors.lightGray,
          "&.Mui-focused": {
            color: theme.colors.lightBlue,
          },
        },
        "& input": {
          backgroundColor: "transparent !important",
        },
        "& input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0px 1000px transparent inset !important",
          WebkitTextFillColor: "#fff !important",
          transition: "background-color 9999s ease-in-out 0s !important",
        },
        "& input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active": {
          WebkitBoxShadow: "0 0 0px 1000px transparent inset !important",
          WebkitTextFillColor: "#fff !important",
          transition: "background-color 9999s ease-in-out 0s !important",
        },
      }}
    />
  );
}
