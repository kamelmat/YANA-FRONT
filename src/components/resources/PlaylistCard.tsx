import { Box, Card, Typography } from '@mui/material';
import type React from 'react';
import CommonButton from '../../commons/CommonButton';
import useScreenSize from '../../hooks/useScreenSize';
import theme from '../../theme';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface PlaylistCardProps {
  avatar: string;
  title: string;
  description: string;
  image: string;
  id: number;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ title, description, image }) => {
  const screenSize = useScreenSize();
  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: '24.74rem',
        height: screenSize === 'sm' ? '315.67px' : screenSize === 'md' ? '23rem' : '27.41rem',
        border: '1px solid #e0e0e0',
        borderRadius: '10.56px',
        backgroundColor: '#f5f5f5',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
      }}
    >
      <Box
        component="img"
        src={image}
        alt={`Image for ${title}`}
        sx={{
          width: '99%',
          height: screenSize === 'sm' ? '10.14rem' : screenSize === 'md' ? '9rem' : '12rem',
          objectFit: 'cover',
        }}
      />

      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          textAlign: 'left',
          padding: '0.5rem',
          backgroundColor: '#f0f0f0',
          width: '100%',
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: '#757575',
          textAlign: 'left',
        }}
      >
        {description}
      </Typography>

      <CommonButton
        text="Escuchar"
        sx={{
          textTransform: 'none',
          borderRadius: '20px',
          width: screenSize === 'sm' ? '75.78px' : '7rem',
          height: '2.2rem',
          marginLeft: 'auto',
          backgroundColor: theme.colors.lightBlue,
          color: '#fff',
        }}
      />
    </Card>
  );
};

export default PlaylistCard;
