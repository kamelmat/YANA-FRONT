import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  Typography,
} from '@mui/material';
import { useGetTemplateMessages } from '../hooks/useGetTemplateMessages';
import { useSendSupport } from '../hooks/useSendSupport';

import buttonSendGreen from '../assets/messages/buttonSendGreen.svg';
import buttonSendOrange from '../assets/messages/buttonSendOrange.svg';
import buttonSendPink from '../assets/messages/buttonSendPink.svg';
import buttonSendPurple from '../assets/messages/buttonSendPurple.svg';
import theme from '../theme';

interface MarkerModalProps {
  open: boolean;
  onClose: () => void;
  userId: string | null;
  position: { x: number; y: number } | null;
  sharedEmotion: number | null;
}

export default function MarkerModal({
  open,
  onClose,
  position,
  userId,
  sharedEmotion,
}: MarkerModalProps) {
  const { data: responses, isLoading, isError } = useGetTemplateMessages();
  const { mutate: sendSupport, isPending, isSuccess } = useSendSupport();

  const handleSend = (templateId: string) => {
    if (!userId || sharedEmotion === null) return;
    sendSupport({
      shared_emotion: sharedEmotion,
      template: templateId,
    });
  };

  const icons = [buttonSendGreen, buttonSendOrange, buttonSendPink, buttonSendPurple];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: 'black',
          color: 'white',
          minWidth: '250px',
          maxWidth: '400px',
          padding: 0,
          margin: 0,
          borderRadius: `0 ${theme.borders.borderRadius} ${theme.borders.borderRadius} ${theme.borders.borderRadius}`,
          position: 'absolute',
          top: position?.y ? position.y + 90 : 500,
          left: position?.x ? position.x + 135 : 1000,
          transform: 'translate(-50%, -50%)',
          transition: 'top 0.3s, left 0.3s',
          '@media (max-width: 600px)': {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
          },
        },
      }}
    >
      <DialogContent sx={{ padding: 2, overflow: 'hidden', py: 1 }}>
        {isLoading && <CircularProgress sx={{ color: 'white' }} />}
        {isError && <Typography color="error">Error cargando mensajes</Typography>}
        {isSuccess && <Typography color="success.main">¡Mensaje enviado!</Typography>}
        {responses?.map((response, index) => {
          const icon = icons[index % icons.length];

          return (
            <Box key={response.id}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  py: 0,
                  gap: 4,
                }}
              >
                <Typography variant="body1">
                  {response.text}
                </Typography>

                <Button
                  sx={{
                    minWidth: '',
                    p: 0,
                    m: 0,
                    '&:hover': {
                      cursor: 'pointer',
                    },
                  }}
                  onClick={() => handleSend(response.text)}
                  disabled={isPending}
                >
                  <img src={icon} alt="icon" style={{ width: '45px', height: '45px' }} />
                </Button>
              </Box>
              {index < responses.length - 1 && (
                <Divider sx={{ borderColor: 'gray', my: 1, width: '200%', ml: '-50%' }} />
              )}
            </Box>
          );
        })}
      </DialogContent>
    </Dialog>
  );
}
