// components/containers/AuthContainer.tsx
import { Box } from '@mui/material';
import theme from '../theme';

interface AuthContainerProps {
  screenSize: string;
  children: React.ReactNode;
}

export default function AuthContainer({ screenSize, children }: AuthContainerProps) {
  const isLargeScreen = screenSize === "md" || screenSize === "lg";
  const width = screenSize === "lg" ? "27%" : "80%";

  if (isLargeScreen) {
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
            width,
            margin: 'auto',
            borderRadius: '50px',
            boxShadow: '0px 15px 20px rgba(0, 0, 0, 0.5)',
            padding: '2em',
          }}
        >
          {children}
        </Box>
      </Box>
    );
  }

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
      {children}
    </Box>
  );
}
