import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '../assets/icons/account_circle.svg?react';
import LogoutIcon from '../assets/icons/exit.svg?react';
import HelpIcon from '../assets/icons/faq.svg?react';
import SettingsIcon from '../assets/icons/settings.svg?react';
import { useLogout } from '../hooks/useLogout';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      <IconButton onClick={() => setIsOpen(true)} sx={{ color: 'white' }}>
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: '#322F35',
              color: 'white',
              width: 250,
            },
          },
        }}
      >
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            '& .MuiListItem-root': {
              padding: 0,
            },
          }}
        >
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleNavigation('/profile')}
              sx={{ justifyContent: 'space-between' }}
            >
              <ListItemText primary={t('/profile.menu')} />
              <ListItemIcon
                sx={{
                  '& svg': { '& path': { fill: 'white' }, width: '28px', height: '28px' },
                  minWidth: 'auto',
                }}
              >
                <PersonIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>

          <Box sx={{ flexGrow: 1 }} />

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleNavigation('/FAQ')}
              sx={{ justifyContent: 'space-between' }}
            >
              <ListItemText primary={t('/FAQ.menu')} />
              <ListItemIcon
                sx={{
                  '& svg': { '& path': { fill: 'white' }, width: '28px', height: '28px' },
                  minWidth: 'auto',
                }}
              >
                <HelpIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleNavigation('/profile/configuration')}
              sx={{ justifyContent: 'space-between' }}
            >
              <ListItemText primary={t('/settings.menu')} />
              <ListItemIcon
                sx={{
                  '& svg': { '& path': { fill: 'white' }, width: '28px', height: '28px' },
                  minWidth: 'auto',
                }}
              >
                <SettingsIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout} sx={{ justifyContent: 'space-between' }}>
              <ListItemText primary={t('/logout.menu')} />
              <ListItemIcon
                sx={{
                  '& svg': { '& path': { fill: 'white' }, width: '28px', height: '28px' },
                  minWidth: 'auto',
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default HamburgerMenu;
