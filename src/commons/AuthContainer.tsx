// components/containers/AuthContainer.tsx
import { Box } from '@mui/material';
import theme from '../theme';
import { useLocation } from 'react-router-dom';
import registerBackground from '../assets/register/background.webp';

interface AuthContainerProps {
  screenSize: string;
  children: React.ReactNode;
}

export default function AuthContainer({ screenSize, children }: AuthContainerProps) {
  const location = useLocation();
  const isLargeScreen = screenSize === "md" || screenSize === "lg";
  const width = screenSize === "lg" ? "27%" : "80%";
  const isRegisterPage = location.pathname === "/register";

  if (isLargeScreen) {
    return (
      <Box sx={{ 
        height: '100vh', 
        width: '100vw', 
        background: isRegisterPage ? `url(${registerBackground})` : theme.gradients.gradientPurpleToBottom,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex', 
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 1s ease-in-out',
      }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: "black",
            height: '80%',
            width,
            position: 'absolute',
            left: (screenSize === "lg" && isRegisterPage) ? '10%' : '50%',
            transform: (screenSize === "lg" && isRegisterPage) ? 'translateX(0)' : 'translateX(-50%)',
            borderRadius: '50px',
            boxShadow: '0px 15px 20px rgba(0, 0, 0, 0.5)',
            padding: '2em',
            zIndex: 1,
            animation: isRegisterPage ? 'slideIn 0.25s ease-in-out' : 'slideOut 0.25s ease-in-out',
            '@keyframes slideIn': {
              '0%': { left: '50%', transform: 'translateX(-50%)' },
              '100%': { left: '10%', transform: 'translateX(0)' }
            },
            '@keyframes slideOut': {
              '0%': { left: '10%', transform: 'translateX(0)' },
              '100%': { left: '50%', transform: 'translateX(-50%)' }
            }
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
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.5s ease-in-out'
      }}
    >
      {children}
    </Box>
  );
}
