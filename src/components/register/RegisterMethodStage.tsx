import { Typography, Link } from "@mui/material";
import CustomButton from "../../commons/CommonButton";
import Mail from "../../assets/icons/Mail.svg";
import Google from "../../assets/icons/Google.svg";
import theme from "../../theme";

export default function RegisterMethodStage({ onEmailClick }: { onEmailClick: () => void }) {
  return (
    <>
      <CustomButton
        text="Usar correo electrónico para registrarse"
        icon={<img src={Mail} alt="Mail Icon" style={{ width: '20px' }} />}
        onClick={onEmailClick}
      />
      <CustomButton
        text="Iniciar sesión con Google"
        icon={<img src={Google} alt="Google Icon" style={{ width: '35px', height: '35px' }} />}
        variantType="secondary"
        onClick={() => console.log('Google login')}
      />
      <Typography variant="body1" fontSize={13} align="center" sx={{ color: "#fff", fontWeight: "light" }}>
        Al crear una cuenta, aceptas los{' '}
        <Link href="#" underline="none" sx={{ color: theme.colors.lightBlue }}>
          Términos de uso y políticas de privacidad.
        </Link>
      </Typography>
    </>
  );
}
