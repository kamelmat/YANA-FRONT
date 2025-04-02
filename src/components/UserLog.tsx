import Google from '../assets/icons/Google.svg';
import Logo from '../assets/images/Logo.webp';
import theme from '../theme';

import { useState } from "react";
import { useScreenSize } from '../hooks/useScreenSize';
import { Box, Button, Checkbox, Link, Stack, TextField, Typography } from '@mui/material';

export default function UserLog() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const screenSize = useScreenSize();
  

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log('Email:', email, 'Password:', password, 'Remember Me:', rememberMe);
  };

  if (screenSize !== "sm") return;



  // Estilos reutilizables para TextField
  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: '#fff' },
      '&:hover fieldset': { borderColor: '#fff' },
      '&.Mui-focused fieldset': { borderColor: '#fff' },
    },
    '& .MuiInputBase-input': { color: '#fff' },
    '& .MuiInputLabel-root': { color: '#fff' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#fff' },
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '400px', 
        gap: 3, 
      }}
    >
      <img
        src={Logo}
        alt="Descripción de la imagen"
        style={{
          maxWidth: '100%',
          height: '20dvh',
          width: '45dvw',
        }}
      />

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          width: '100%',
          color: '#fff',
        }}
      >
        <Typography component="h1" variant="h6" gutterBottom align="center">
          Acceder
        </Typography>

        <Stack spacing={2} direction="column">
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              sx={textFieldStyles}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              sx={textFieldStyles}
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
          <Link href="#" variant="body1" sx={{ color: '#4285F4', textDecoration: 'none' }}>
            Olvidé la contraseña
          </Link>
        </Stack>

        <Stack spacing={3} direction="column" sx={{ marginTop: 5 }}>
          <Button
            type="submit"
            size="medium"
            variant="outlined"
            fullWidth
            sx={{
              marginTop: 3,
              marginBottom: 2,
              color: '#000000',
              backgroundColor: '#f7f2fa',
              borderRadius: theme.borders?.borderRadius,
              textTransform: 'capitalize',
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
              marginTop: 3,
              marginBottom: 2,
              color: '#809AEE',
              borderRadius: theme.borders?.borderRadius,
              borderColor: '#4285F4',
              textTransform: 'capitalize',
              '&:hover': {
                borderColor: '#4285F4',
                borderWidth: 2,
              },
              '&:active': {
                borderColor: '#4285F4',
                borderWidth: 2,
              },
            }}
          >
            Iniciar Sesión con Google
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            ¿No tienes una cuenta?{' '}
            <Link href="#" underline="none" sx={{ textTransform: 'none'}}>
              ¡Regístrate!
            </Link>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}