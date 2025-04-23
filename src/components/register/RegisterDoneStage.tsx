import CustomButton from '../../commons/CommonButton';
import { useTranslation } from 'react-i18next';

export default function RegisterDoneStage({ onContinue }: { onContinue: () => void }) {
  const { t } = useTranslation();

  return <CustomButton text={t('register.continue')} onClick={onContinue} />;
}
