import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../commons/CommonButton';

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export default function Modal({ open, onClose }: ModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
            backgroundColor: '#ECE6F0',
            color: '#000',
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
        variant="h2"
        sx={{
          color: '#000',
        }}
      >
        {t('helpModal.title')}
      </DialogTitle>
      <DialogTitle
        variant="body1"
        sx={{
          color: '#49454F',
          fontWeight: 'light',
        }}
      >
        <Trans i18nKey="helpModal.subtitle" />💙
      </DialogTitle>
      <DialogContent sx={{ mt: '10%' }}>
        <CustomButton
          text={t('helpModal.button')}
          onClick={() => {
            navigate('/contacts');
          }}
          variantType="secondary-fill"
          sx={{ color: '#fff', fontWeight: 'normal', boxShadow: '0 8px 10px rgba(0, 0, 0, 0.3)' }}
        />
      </DialogContent>
    </Dialog>
  );
}
