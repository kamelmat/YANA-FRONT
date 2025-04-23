import { Box, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthContainer from '../commons/AuthContainer';
import CommonButton from '../commons/CommonButton';
import CommonTextField from '../commons/CommonTextField';
import { usePasswordReset } from '../hooks/usePasswordReset';
import useScreenSize from '../hooks/useScreenSize';
import theme from '../theme';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const screenSize = useScreenSize();
  const { mutate: resetPassword } = usePasswordReset();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    resetPassword(
      { email },
      {
        onSettled: () => {
          setIsLoading(false);
        },
      }
    );
  };

  const isButtonDisabled = !email || isLoading;

  return (
    <AuthContainer screenSize={screenSize}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          justifyContent: 'space-between',
          padding: screenSize === 'sm' ? '10% 1em' : '',
        }}
      >
        <Box
          gap="1em"
          sx={{ marginTop: '25%' }}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography
            variant="h5"
            sx={{
              color: theme.colors.lightGray,
            }}
          >
            {t('resetPassword.subtitle')}
          </Typography>

          <CommonTextField
            label={t('resetPassword.email')}
            value={email}
            setValue={setEmail}
            placeholder={t('resetPassword.emailPlaceholder')}
            type="email"
            disabled={isLoading}
          />
        </Box>

        <CommonButton
          variantType="secondary-fill"
          text={t('resetPassword.sendResetLink')}
          type="submit"
          disabled={isButtonDisabled}
          icon={isLoading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : undefined}
          sx={{
            color: '#fff',
            fontWeight: 'normal',
          }}
        />
      </Box>
    </AuthContainer>
  );
}
