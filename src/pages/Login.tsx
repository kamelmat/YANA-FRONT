import LogIn from "../components/LoginComponent"
import { useScreenSize } from '../hooks/useScreenSize';
import theme from '../theme';

import { Box } from '@mui/material';

export default function Login() {
  const screenSize = useScreenSize();

  console.log("screenSize", screenSize);

  switch (screenSize) {
    case "md":
    case "lg":
      const width = screenSize === "lg" ? "27%" : "80%";
      return (
        <Box sx={{ height: '100vh', width: '100vw', background: theme.gradients.gradientPurpleToBottom, display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: "black",
              height: '80%',
              width: width,
              margin: 'auto',
              borderRadius: '50px',
              boxShadow: '0px 15px 20px rgba(0, 0, 0, 0.5)',
              padding: '2em',
            }}
          >
            <LogIn />
          </Box>
        </Box>
      );
    case "sm":
    default:
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: theme.colors.blackBackground,
            height: '100vh',
          }}
        >
          <LogIn />
        </Box>
      );
  }
}
