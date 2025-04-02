import theme from '../theme';
import UserLog from '../components/UserLog';
import { Container } from '@mui/material';

export default function Home() {
 

  return (
    <Container
      component="main"
      sx={{
        backgroundColor: theme.colors?.blackBackground, // Fondo del tema
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        paddingTop: 0, // Mantenemos el paddingTop original
        boxSizing: 'border-box',
      }}
    >
      <UserLog />
      
    </Container>
  );
}