import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CustomButton from './CommonButton';
import CustomTextField from './CommonTextField';
import { useState } from 'react';
import theme from '../theme';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onPasswordSubmit: (password: string) => void;
}

export default function Modal({
  open,
  onClose,
  onPasswordSubmit,
}: ModalProps) {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');

  const handleConfirm = () => {
    onPasswordSubmit(password);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: 'blur(20px)'
          }
        },
        paper: {
          sx: {
            backgroundColor: 'black',
            color: 'white',
            borderRadius: '20px',
            padding: {
              xs: '1rem',
              md: '2rem',
            },
            minWidth: { md: '400px' },
            width: {
              xs: '80%',
              md: '50%',
              lg: '20%'
            }
          }
        }
      }}
    >
      <DialogTitle sx={{ 
        color: 'white', 
        textAlign: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        p: 0,
      }}>
        {t('common.deleteAccount')}
      </DialogTitle>
      <DialogTitle sx={{ 
        color: 'white', 
        textAlign: 'center',
        fontSize: '0.75rem',
        fontWeight: 'light',
        p: 0,
      }}>
        {t('common.deleteAccountMessage')}
      </DialogTitle>
      <DialogContent sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        overflow: 'visible',
        mt: 10,
        mb: 4,
        px: 1
      }}>
        <form onSubmit={(e) => e.preventDefault()} style={{ width: '100%' }}>
          {/* username for accessibility warning */}
          <input
            type="text"
            name="username"
            autoComplete="username"
            style={{ display: 'none' }}
          />
          <CustomTextField
            label={t('login.password')}
            value={password}
            setValue={setPassword}
            type="password"
            slotProps={{
              input: {
                autoComplete: "current-password"
              }
            }}
            sx={{
              width: '100%'
            }}
          />
        </form>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: 2, 
          mt: 2,
          width: '100%'
        }}>
          <CustomButton
            text={t('common.delete')}
            variantType="secondary"
            onClick={handleConfirm}
            sx={{
              backgroundColor: theme.colors.red,
              color: 'white',
              border: 'none',
              fontWeight: 'light',
              '&:hover': {
                backgroundColor: `${theme.colors.red}CC`
              }
            }}
          />
          <CustomButton
            text={t('common.cancel')}
            variantType="primary"
            onClick={onClose}
            sx={{
              fontWeight: 'light',
            }}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
} 