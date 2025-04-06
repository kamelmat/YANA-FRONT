import CustomButton from "../../commons/CommonButton";

export default function RegisterDoneStage({ onContinue }: { onContinue: () => void }) {
  return <CustomButton text="Continuar" onClick={onContinue} />;
}
