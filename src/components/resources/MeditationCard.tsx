import { Box, Card, CardContent, Typography } from '@mui/material';
import type React from 'react';
import CommonButton from '../../commons/CommonButton';
import useScreenSize from '../../hooks/useScreenSize';
import theme from '../../theme';

interface MeditationCardProps {
  avatar: string;
  title: string;
  description: string;
  id: number;
  image: string;
}

const MeditationCard: React.FC<MeditationCardProps> = ({
  avatar,
  title,
  description,
  id,
  image,
}) => {
  const screenSize = useScreenSize();

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: '24.74rem',
        height: screenSize === 'sm' ? '304.34px' : screenSize === 'md' ? '22rem' : '24.94rem',
        maxHeight: '399px',
        border: '1px solid #e0e0e0',
        borderRadius: '10.56px',
        backgroundColor: '#f5f5f5',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          paddingLeft: '0.5rem',
        }}
      >
        <Box
          component="img"
          src={avatar}
          alt={`Avatar for ${title}`}
          sx={{
            width: '3.75rem',
            height: '3.75rem',
            borderRadius: '50%',
            marginTop: '1rem',
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
      </Box>

      <Box
        component="img"
        src={image}
        alt={`Meditation ${id}`}
        sx={{
          width: '100%',
          height: screenSize === 'sm' ? '140.14px' : '164.83px',
          objectFit: 'cover',
        }}
      />

      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '1rem',
          height: '4.94rem',
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: '#757575',
            marginBottom: '1rem',
            textAlign: 'left',
          }}
        >
          {description}
        </Typography>
        <CommonButton
          text="Acceder"
          sx={{
            width: screenSize === 'sm' ? '75.78px' : '7rem',
            height: '2.2rem',
            marginLeft: 'auto',
            backgroundColor: theme.colors.lightBlue,
            color: 'white',
            borderRadius: '1.13rem',
          }}
        />
      </CardContent>
    </Card>
  );
};

export default MeditationCard;
