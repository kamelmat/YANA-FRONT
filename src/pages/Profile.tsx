import ProfileMobile from "../components/profile/ProfileMobile";
import ProfileDesktop from "../components/profile/ProfileDesktop";
import { useScreenSize } from "../hooks/useScreenSize";

export default function Profile() {
  const screenSize = useScreenSize();

  if (screenSize === "md" || screenSize === "lg") {
    return <ProfileDesktop />;
  } else {
    return <ProfileMobile />;
  }
}
