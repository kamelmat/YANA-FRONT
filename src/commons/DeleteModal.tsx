import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomButton from './CommonButton';
import CustomTextField from './CommonTextField';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onPasswordSubmit: (password: string) => void;
}

export default function Modal({ open, onClose, onPasswordSubmit }: ModalProps) {
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
            backdropFilter: 'blur(20px)',
          },
        },
        paper: {
          sx: {
            backgroundColor: 'black',
            color: 'white',
            borderRadius: { md: '50px', xs: '25px' },
            padding: {
              xs: '1rem',
              md: '2rem',
            },
            minWidth: { md: '400px' },
            width: {
              xs: '80%',
              md: '50%',
              lg: '20%',
            },
          },
        },
      }}
    >
      <DialogTitle
        variant="h4"
        sx={{
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          p: 0,
        }}
      >
        {t('common.deleteAccount')}
      </DialogTitle>
      <DialogTitle
        variant="body2"
        sx={{
          color: 'white',
          textAlign: 'center',
          fontWeight: 'light',
          p: 0,
        }}
      >
        {t('common.deleteAccountMessage')}
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          overflow: 'visible',
          mt: 10,
          mb: 4,
          px: 1,
        }}
      >
        <form onSubmit={(e) => e.preventDefault()} style={{ width: '100%' }}>
          {/* username for accessibility warning */}
          <input type="text" name="username" autoComplete="username" style={{ display: 'none' }} />
          <CustomTextField
            label={t('login.password')}
            value={password}
            setValue={setPassword}
            type="password"
            placeholder={t('common.passwordPlaceholder')}
            slotProps={{
              input: {
                autoComplete: 'current-password',
              },
            }}
            sx={{
              width: '100%',
            }}
          />
        </form>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 2,
            width: '100%',
          }}
        >
          <CustomButton
            text={t('common.delete')}
            variantType="cancel-fill"
            onClick={handleConfirm}
          />
          <CustomButton text={t('common.cancel')} variantType="primary" onClick={onClose} />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
