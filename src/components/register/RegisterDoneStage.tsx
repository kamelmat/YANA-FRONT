import { useTranslation } from "react-i18next";
import CustomButton from "../../commons/CommonButton";

export default function RegisterDoneStage({ onContinue }: { onContinue: () => void }) {
  const { t } = useTranslation();

  return <CustomButton text={t("register.continue")} onClick={onContinue} />;
}
