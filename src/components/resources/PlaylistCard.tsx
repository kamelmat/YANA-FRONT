import { Box, Card, Typography } from '@mui/material';
import type React from 'react';
import CommonButton from '../../commons/CommonButton';
import useScreenSize from '../../hooks/useScreenSize';
import { useTranslation } from 'react-i18next';

interface PlaylistCardProps {
  title: string;
  description: string;
  image: string;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ title, description, image }) => {
  const screenSize = useScreenSize();
  const { t } = useTranslation();
  
  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: '24.74rem',
        height: screenSize === 'sm' ? '304.34px' : screenSize === 'md' ? '22rem' : '24.94rem',
        maxHeight: '399px',
        borderRadius: '16px',
        backgroundColor: '#fff',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        component="img"
        src={image}
        alt={title}
        sx={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />

      <Box sx={{ 
        p: 2, 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CommonButton
            text={t('resources.listen')}
            variantType="secondary-fill"
            sx={{
              width: screenSize === 'sm' ? '75.78px' : '7rem',
              height: '2.2rem',
            }}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default PlaylistCard;
