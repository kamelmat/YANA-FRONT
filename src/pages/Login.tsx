import LogIn from "../components/LoginComponent";
import useScreenSize from "../hooks/useScreenSize";

import AuthContainer from "../commons/AuthContainer";

export default function Login() {
  const screenSize = useScreenSize();

  return (
    <AuthContainer screenSize={screenSize}>
      <LogIn />
    </AuthContainer>
  );
}
