import Google from '../assets/icons/Google.svg';
import Logo from '../../public/yana.svg';
import Slogan from '../assets/branding/slogan.svg';
import theme from '../theme';

import { useState, useEffect } from "react";
import { useScreenSize } from '../hooks/useScreenSize';
import { Box, Button, Checkbox, Link, Stack, TextField, Typography } from '@mui/material';

export default function UserLog() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const screenSize = useScreenSize();


  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (rememberMe) {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      localStorage.removeItem('rememberMe');
    }
  };

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (savedRememberMe) {
      setUsername(savedUsername || '');
      setPassword(savedPassword || '');
      setRememberMe(savedRememberMe);
    }
  }, []);

  if (screenSize !== "sm") return;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.colors.blackBackground,
        height: '100vh',
      }}
    >
      <img src={Logo} alt="Logo" style={{ width: '25vw', height: 'auto', marginBottom: "0.75rem" }} />
      <img src={Slogan} alt="Slogan" style={{ width: '55vw', height: 'auto', marginBottom: "2rem" }} />

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          width: '100%',
          padding: '0 1em',
          color: '#fff',
        }}
      >
        <Typography>
          Acceder
        </Typography>

        <Stack spacing={2} direction="column" sx={{ marginTop: 1 }}>
          <TextField
            fullWidth
            id="username"
            label="Usuario"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
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

          <TextField
            id="password"
            label="Contraseña"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            sx={{
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
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              onChange={(e) => setRememberMe(e.target.checked)}
              sx={{ color: '#fff', '&.Mui-checked': { color: '#fff' } }}
            />
            <Typography variant="body2" sx={{ color: '#fff' }}>
              Recordarme
            </Typography>
          </Box>
          <Link href="#" variant="body2" sx={{ color: theme.colors.lightBlue, textDecoration: 'none' }}>
            Olvidé la contraseña
          </Link>
        </Stack>

        <Stack spacing={1.5} direction="column" sx={{ marginTop: 4 }}>
          <Button
            type="submit"
            size="medium"
            fullWidth
            sx={{
              color: 'black',
              backgroundColor: theme.colors.lightGray,
              borderRadius: '35px',
              textTransform: 'none',
              padding: '1em',
              fontWeight: 600,
            }}
          >
            Ingresar
          </Button>

          <Button
            size="medium"
            type="submit"
            variant="outlined"
            fullWidth
            startIcon={<img src={Google} alt="Google Icon" style={{ width: '20px', height: '20px' }} />}
            sx={{
              marginBottom: 2,
              color: '#809AEE',
              borderRadius: '30px',
              textTransform: 'none',
              padding: '1em',
              fontWeight: 600,
              borderColor: theme.colors.lightBlue,
            }}
          >
            Iniciar sesión con Google
          </Button>
        </Stack>

        <Typography variant="body2" align="center" sx={{ mt: 4 }}>
          ¿No tienes una cuenta?{' '}
          <Link href="#" underline="none" sx={{ textTransform: 'none', color: theme.colors.lightBlue }}>
            Regístrate
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
