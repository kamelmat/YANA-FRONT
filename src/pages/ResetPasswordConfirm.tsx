import { useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import CommonTextField from '../commons/CommonTextField';
import CommonButton from '../commons/CommonButton';
import AuthContainer from '../commons/AuthContainer';
import useScreenSize from '../hooks/useScreenSize';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { usePasswordResetConfirm } from '../hooks/usePasswordResetConfirm';
import { validatePassword, validateRepeatPassword, getPasswordStrength } from '../utils/registerUtils';

export default function ResetPasswordConfirm() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const screenSize = useScreenSize();
  const { uid, token } = useParams<{ uid: string; token: string }>();
  const { mutate: confirmReset } = usePasswordResetConfirm();

  const passwordStrength = getPasswordStrength(newPassword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const passwordValidation = validatePassword(newPassword);
    const repeatPasswordValidation = validateRepeatPassword(confirmPassword, newPassword);
    
    setPasswordError(passwordValidation);
    setRepeatPasswordError(repeatPasswordValidation);
    
    if (passwordValidation || repeatPasswordValidation) {
      return;
    }
    
    if (!uid || !token) {
      return;
    }
    
    setIsLoading(true);
    confirmReset({
      uidb64: uid,
      token,
      new_password: newPassword,
      confirm_password: confirmPassword,
    }, {
      onSettled: () => {
        setIsLoading(false);
      }
    });
  };

  const isButtonDisabled = !newPassword || !confirmPassword || isLoading || !!passwordError || !!repeatPasswordError;

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
        <Box gap="1em" sx={{ marginTop: '25%' }} display="flex" flexDirection="column" width="100%">
          <CommonTextField
            label={t('resetPassword.newPassword')}
            value={newPassword}
            setValue={(val) => {
              setNewPassword(val);
              setPasswordError(validatePassword(val));
            }}
            placeholder={t('resetPassword.newPasswordPlaceholder')}
            type="password"
            disabled={isLoading}
            error={!!passwordError}
            helperText={passwordError}
          />

          {newPassword && (
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: "light" }}>
              {t("register.password.passwordStrength.text")}:{" "}
              <Box component="span" sx={{
                color: passwordStrength === t("register.password.passwordStrength.strong") ? "limegreen"
                  : passwordStrength === t("register.password.passwordStrength.medium") ? "orange"
                    : "red",
                fontWeight: "bold"
              }}>
                {passwordStrength}
              </Box>
            </Typography>
          )}

          <CommonTextField
            label={t('resetPassword.repeatNewPassword')}
            value={confirmPassword}
            setValue={(val) => {
              setConfirmPassword(val);
              if (val && newPassword) {
                setRepeatPasswordError(validateRepeatPassword(val, newPassword));
              }
            }}
            placeholder={t('resetPassword.repeatNewPasswordPlaceholder')}
            type="password"
            disabled={isLoading}
            error={!!repeatPasswordError}
            helperText={repeatPasswordError}
          />
        </Box>

        <CommonButton
          variantType="secondary-fill"
          text={t('resetPassword.changePassword')}
          type="submit"
          disabled={isButtonDisabled}
          icon={isLoading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : undefined}
          sx={{
            color: "#fff",
            fontWeight: "normal",
          }}
        />
      </Box>
    </AuthContainer>
  );
} 