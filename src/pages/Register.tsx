import { Typography, Box, Stack, Link } from "@mui/material";
import AuthContainer from "../commons/AuthContainer";
import { useScreenSize } from '../hooks/useScreenSize';
import theme from "../theme";
import CustomButton from "../commons/CommonButton";
import Mail from "../assets/icons/Mail.svg";
import Google from '../assets/icons/Google.svg';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const screenSize = useScreenSize();
  const navigate = useNavigate();

  return (
    <AuthContainer screenSize={screenSize}>
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent="space-between"
        alignItems="center"
        sx={{ height: "100%", my: 6, px: 1}}
      >
        <Box
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center"
        >
          <Box sx={{ width: "50%", aspectRatio: "1/1", backgroundColor: theme.colors.lightGray, borderRadius: '50%', mb: 3 }} />
          <Typography variant="h4" align="center" sx={{ color: "#fff", fontWeight: "light" }}>
            Crear una cuenta
          </Typography>
          <Typography variant="body1" fontSize={13} align="center" sx={{ color: "#fff", fontWeight: "light" }}>
            Tu información es confidencial. No vamos a compartir tus datos.
          </Typography>
          <Stack sx={{ width: "100%", gap: 2, my: 3 }}>
            <CustomButton
              text="Usar correo electrónico para registrarse"
              icon={<img src={Mail} alt="Mail Icon" style={{ width: '20px' }} />}
            />
            <CustomButton
                text="Iniciar sesión con Google"
                icon={<img src={Google} alt="Google Icon" style={{ width: '35px', height: '35px' }} />}
                variantType="secondary"
                onClick={() => console.log('Google login')}
              />
          </Stack>
          <Typography variant="body1" fontSize={13} align="center" sx={{ color: "#fff", fontWeight: "light" }}>
            Al crear una cuenta, aceptas los{' '}
              <Link href="#" underline="none" sx={{ textTransform: 'none', color: theme.colors.lightBlue }}>
                Términos de uso y políticas de privacidad.
              </Link>
          </Typography>
        </Box>
        <Typography variant="body1" fontSize={13} align="center" sx={{ color: "#fff", fontWeight: "light" }}>
          ¿Tienes una cuenta?{' '}
            <Link href="#" underline="none" sx={{ textTransform: 'none', color: theme.colors.lightBlue }} onClick={() => navigate('/login')}>
              Ingresar
            </Link>
        </Typography>
      </Box>
    </AuthContainer>
  )
}
