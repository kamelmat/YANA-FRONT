import { useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import onboarding1 from '../assets/onboarding/1.webp';
import onboarding2 from '../assets/onboarding/2.webp';
import onboarding3 from '../assets/onboarding/3.webp';
import onboarding4 from '../assets/onboarding/4.webp';
import CustomButton from '../commons/CommonButton';
import theme from '../theme';
import { useScreenSize } from '../hooks/useScreenSize';
import backIcon from '../assets/icons/back.svg';

const ONBOARDING_IMAGES = {
  1: onboarding1,
  2: onboarding2,
  3: onboarding3,
  4: onboarding4,
};

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const screenSize = useScreenSize();

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimating) return;
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isAnimating) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (isAnimating || !touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentStep < 4) {
      setIsAnimating(true);
      setDirection("left");
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setDirection(null);
        setIsAnimating(false);
      }, 300);
    }
    if (isRightSwipe && currentStep > 1) {
      setIsAnimating(true);
      setDirection("right");
      setTimeout(() => {
        setCurrentStep((prev) => prev - 1);
        setDirection(null);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleStart = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleBack = useCallback(() => {
    if (currentStep === 1) {
      navigate(-1);
    } else {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep, navigate]);

  const getStepTransform = (step: number) => {
    const offset = step - currentStep;
    if (direction === "left") {
      return `translateX(${(offset - 1) * 100}%)`;
    }
    if (direction === "right") {
      return `translateX(${(offset + 1) * 100}%)`;
    }
    return `translateX(${offset * 100}%)`;
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1E1E1E',
        position: 'relative',
        overflow: 'hidden',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          padding: '1em',
        }}
      >
        <Box
          component="img"
          src={backIcon}
          alt="back"
            sx={{
              height: "2em",
              width: "2em",
              alignSelf: "flex-start",
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.15)"
              },
              position: "absolute",
              top: "1em",
              left: "1em"
          }}
          onClick={handleBack}
        />  
      </Box>

      <Box
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {[1, 2, 3, 4].map((step) => (
          <Box
            key={step}
            sx={{
              position: 'absolute',
              top: {
                xs: '15%',
                sm: '25%',
              },
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: getStepTransform(step),
              transition: 'transform 0.3s ease-in-out',
              padding: {
                xs: '0 1em',
                sm: '0 10%',
              },
            }}
          >
            {/* Image */}
            <Box
              sx={{
                width: screenSize === 'sm' ? '60vw' : screenSize === 'md' ? '80%' : '40%',
                maxWidth: '400px',
                aspectRatio: '1/1',
                mb: 4,
              }}
            >
              <img
                src={ONBOARDING_IMAGES[step as keyof typeof ONBOARDING_IMAGES]}
                alt={`Onboarding step ${step}`}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </Box>

            {/* Title */}
            <Typography
              variant="h4"
              align="center"
              sx={{
                color: '#fff',
                fontWeight: 'bold',
                mb: 2,
                px: 2,
              }}
            >
              {t(`onboarding.step${step}.title`)}
            </Typography>

            {/* Subtitle */}
            <Typography
              variant="body1"
              align="center"
              sx={{
                color: '#fff',
                px: 2,
                mb: 4,
              }}
            >
              {t(`onboarding.step${step}.subtitle`)}
            </Typography>

            {/* Start Button */}
            {step === 4 && (
              <CustomButton
                sx={{
                  mt: 5,
                }}
                text={t("common.start")}
                onClick={handleStart}
                variantType="secondary-fill"
              />
            )}
          </Box>
        ))}
      </Box>

      {/* Dots */}
      {currentStep !== 4 && !(direction === "left" && currentStep === 3) && (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            position: "absolute",
            bottom: {
              xs: '15%',
              sm: '22.5%',
            },
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {[1, 2, 3].map((step) => (
            <Box
              key={step}
              sx={{
                width: 15,
                height: 15,
                borderRadius: "50%",
                backgroundColor: currentStep === step ? theme.colors.lightBlue : "#fff",
                transition: "all 0.3s ease-in-out",
                transform: currentStep === step ? "scale(1.2)" : "scale(1)",
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Onboarding;
