import CustomTextField from "../../commons/CommonTextField";

interface Props {
  name: string;
  setName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  emailError: string;
  handleEmailBlur: () => void;
}

export default function RegisterEmailStage({ name, setName, email, setEmail, emailError, handleEmailBlur }: Props) {
  return (
    <>
      <CustomTextField
        label="Nombre"
        value={name}
        setValue={setName}
        placeholder="Ingresa tu nombre"
      />
      <CustomTextField
        label="Email"
        value={email}
        setValue={setEmail}
        placeholder="Completa tu email"
        error={!!emailError}
        helperText={emailError}
        onBlur={handleEmailBlur}
      />
    </>
  );
}
