import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { useSettingsStore } from '../store/useSettingsStore';
import baseTheme from '../theme';
import { useMemo } from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { settings } = useSettingsStore();

  const theme = useMemo(() => {
    return createTheme({
      ...baseTheme,
      typography: {
        ...baseTheme.typography,
        fontSize: settings.fontSize === 'large' ? 20 : 16,
        h1: {
          ...baseTheme.typography.h1,
          fontSize: settings.fontSize === 'large' ? '3.5rem' : '2.5rem',
        },
        h2: {
          ...baseTheme.typography.h2,
          fontSize: settings.fontSize === 'large' ? '3rem' : '2rem',
        },
        h3: {
          ...baseTheme.typography.h3,
          fontSize: settings.fontSize === 'large' ? '2.5rem' : '1.75rem',
        },
        h4: {
          ...baseTheme.typography.h4,
          fontSize: settings.fontSize === 'large' ? '2rem' : '1.5rem',
        },
        h5: {
          ...baseTheme.typography.h5,
          fontSize: settings.fontSize === 'large' ? '1.75rem' : '1.25rem',
        },
        h6: {
          ...baseTheme.typography.h6,
          fontSize: settings.fontSize === 'large' ? '1.5rem' : '1rem',
        },
        body1: {
          ...baseTheme.typography.body1,
          fontSize: settings.fontSize === 'large' ? '1.25rem' : '1rem',
        },
        body2: {
          ...baseTheme.typography.body2,
          fontSize: settings.fontSize === 'large' ? '1.125rem' : '0.875rem',
        },
        body3: {
          ...baseTheme.typography.body3,
          fontSize: settings.fontSize === 'large' ? '0.875rem' : '0.75rem',
        },
        button: {
          ...baseTheme.typography.button,
          fontSize: settings.fontSize === 'large' ? '1.25rem' : '1rem',
        },
      },
    });
  }, [settings.fontSize]);

  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  );
} 