import { Typography, Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import CustomButton from "../../commons/CommonButton";
import Mail from "../../assets/icons/mail.svg";
import Google from "../../assets/icons/Google.svg";
import theme from "../../theme";

export default function RegisterMethodStage({ onEmailClick }: { onEmailClick: () => void }) {
  const { t } = useTranslation();

  return (
    <>
      <CustomButton
        text={t("register.method.useEmail")}
        icon={<img src={Mail} alt="Mail Icon" style={{ width: '20px' }} />}
        onClick={onEmailClick}
      />
      <CustomButton
        text={t("register.method.useGoogle")}
        icon={<img src={Google} alt="Google Icon" style={{ width: '35px', height: '35px' }} />}
        variantType="secondary"
        onClick={() => console.log('Google login')}
      />
      <Typography variant="body1" fontSize={13} align="center" sx={{ color: "#fff", fontWeight: "light" }}>
        {t("register.method.privacyText")}{' '}
        <Link href="#" underline="none" sx={{ color: theme.colors.lightBlue }}>
          {t("register.method.privacyLink")}
        </Link>
      </Typography>
    </>
  );
}