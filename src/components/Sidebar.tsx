import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import useScreenSize from '../hooks/useScreenSize';

import { useLogout } from '../hooks/useLogout';
import { useAuthStore } from '../store/authStore';
import { getFormattedDate } from '../utils/getFormattedDate';

import ExitIcon from '../assets/icons/exit.svg?react';
import FAQIcon from '../assets/icons/faq.svg?react';
import ResourcesIcon from '../assets/icons/loupe.svg?react';
import ContactsIcon from '../assets/icons/people_outline.svg?react';
import HomeIcon from '../assets/icons/roofing.svg?react';
import SettingsIcon from '../assets/icons/settings.svg?react';

import styled from '@emotion/styled';

const ICON_SIZE = '2rem';
const WIDTH = 250;
const PADDING_X = '1.75rem';

interface NavItem {
  icon: React.ReactNode;
  selectedColor: string;
  route: string;
}

interface StyledListItemProps {
  selected?: boolean;
  selectedColor?: string;
}

const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'selectedColor',
})<StyledListItemProps>(({ selectedColor, selected }) => ({
  color: selected ? selectedColor : '#fff',
  padding: `12px ${PADDING_X}`,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: selectedColor,
  },
  '& svg': {
    '& path': {
      fill: selected ? selectedColor : '#ffffff',
      transition: 'all 0.3s ease',
    },
  },
  '&:hover svg': {
    '& path': {
      transition: 'all 0.3s ease',
      fill: selectedColor,
    },
  },
}));

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const screenSize = useScreenSize();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { mutate: logout } = useLogout();
  const name = useAuthStore((state) => state.name);
  const date = getFormattedDate();

  const navItems: NavItem[] = [
    {
      icon: <HomeIcon width={ICON_SIZE} height={ICON_SIZE} />,
      selectedColor: theme.colors.pink,
      route: '/',
    },
    {
      icon: <ResourcesIcon width={ICON_SIZE} height={ICON_SIZE} />,
      selectedColor: theme.colors.lightBlue,
      route: '/resources',
    },
    {
      icon: <ContactsIcon width={ICON_SIZE} height={ICON_SIZE} />,
      selectedColor: theme.colors.yellow,
      route: '/contacts',
    },
    {
      icon: <FAQIcon width={ICON_SIZE} height={ICON_SIZE} />,
      selectedColor: theme.colors.green,
      route: '/FAQ',
    },
    {
      icon: <SettingsIcon width={ICON_SIZE} height={ICON_SIZE} />,
      selectedColor: theme.colors.yellow,
      route: '/profile',
    },
    {
      icon: <ExitIcon width={ICON_SIZE} height={ICON_SIZE} />,
      route: '/logout',
      selectedColor: theme.colors.pink,
    },
  ];

  if (
    screenSize === 'sm' ||
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/onboarding' ||
    location.pathname.startsWith('/reset-password')
  )
    return null;

  const handleItemClick = (route: string) => {
    if (route === '/logout') {
      logout();
    } else {
      navigate(route);
    }
  };

  return (
    <Box
      component="nav"
      sx={{
        position: 'fixed',
        top: 0,
        left: `calc(${-WIDTH}px + ${PADDING_X} * 2 + ${ICON_SIZE})`,
        bottom: 0,
        width: `${WIDTH}px`,
        background: `linear-gradient(to bottom, ${theme.colors.blackBackground}, ${theme.colors.blackBackground})`,
        zIndex: 900,
        borderRadius: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'left 0.3s ease, background 0.3s ease',
        '&:hover': {
          left: 0,
          background: `linear-gradient(to bottom, ${theme.colors.blackBackground}, ${theme.colors.darkPurple} 35%)`,
          '& .welcome-text, & .date-text': {
            opacity: 1,
          },
        },
      }}
    >
      <Box>
        <Box sx={{ paddingLeft: PADDING_X }}>
          <Typography
            variant="h4"
            paddingTop="12vh"
            className="welcome-text"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              lineHeight: 1,
              fontFamily: 'League Spartan',
              opacity: 0,
              transition: 'opacity 0.3s ease',
            }}
          >
            {t('header.welcome', { name })}
          </Typography>

          <Typography
            fontSize={18}
            className="date-text"
            sx={{
              color: 'white',
              fontFamily: 'League Spartan',
              opacity: 0,
              transition: 'opacity 0.3s ease',
            }}
          >
            {date}
          </Typography>
        </Box>
        <List>
          {navItems.slice(0, 4).map((item) => (
            <StyledListItem
              key={item.route}
              selected={location.pathname === item.route}
              selectedColor={item.selectedColor}
              onClick={() => handleItemClick(item.route)}
            >
              <ListItemText primary={t(`${item.route}.menu`)} />
              {item.icon}
            </StyledListItem>
          ))}
        </List>
      </Box>
      <List>
        {navItems.slice(4).map((item) => (
          <StyledListItem
            key={item.route}
            selected={location.pathname === item.route}
            selectedColor={item.selectedColor}
            onClick={() => handleItemClick(item.route)}
          >
            <ListItemText primary={t(`${item.route !== '/login' ? item.route : 'exit'}.menu`)} />
            {item.icon}
          </StyledListItem>
        ))}
      </List>
    </Box>
  );
};

export default React.memo(Sidebar);
