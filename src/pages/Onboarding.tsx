import { Box, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import backIcon from "../assets/icons/back.svg";
import onboarding1 from "../assets/onboarding/1.webp";
import onboarding2 from "../assets/onboarding/2.webp";
import onboarding3 from "../assets/onboarding/3.webp";
import onboarding4 from "../assets/onboarding/4.webp";
import nextIcon from "../assets/onboarding/next.svg";
import CustomButton from "../commons/CommonButton";
import useScreenSize from "../hooks/useScreenSize";
import theme from "../theme";

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
      handleNext();
    }
    if (isRightSwipe && currentStep > 1) {
      handlePrev();
    }
  };

  const handleNext = useCallback(() => {
    if (currentStep < 4) {
      setIsAnimating(true);
      setDirection("left");
      setTimeout(() => {
        setCurrentStep((prev) => (prev + 1 <= 4 ? prev + 1 : 4));
        setDirection(null);
        setIsAnimating(false);
      }, 300);
    }
  }, [currentStep]);

  const handlePrev = useCallback(() => {
    if (currentStep > 1) {
      setIsAnimating(true);
      setDirection("right");
      setTimeout(() => {
        setCurrentStep((prev) => (prev - 1 >= 1 ? prev - 1 : 1));
        setDirection(null);
        setIsAnimating(false);
      }, 300);
    }
  }, [currentStep]);

  const handleStart = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleBack = useCallback(() => {
    if (currentStep === 1 || screenSize === "lg" || screenSize === "xl") {
      navigate(-1);
    } else {
      handlePrev();
    }
  }, [currentStep, navigate, screenSize, handlePrev]);

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

  const renderStepContent = (step: number) => (
    <Box
      sx={{
        position: "absolute",
        top: {
          xs: "12.5%",
          md: "22.5%",
          lg: "45%",
        },
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: getStepTransform(step),
        transition: "transform 0.3s ease-in-out",
        padding: {
          xs: "0 1em",
          md: "0 10%",
        },
      }}
    >
      {/* Image for mobile and tablet */}
      <Box
        sx={{
          display: { xs: "block", lg: "none" },
          width: screenSize === "sm" ? "60vw" : "80%",
          maxWidth: "400px",
          aspectRatio: "1/1",
          mb: 4,
        }}
      >
        <img
          src={ONBOARDING_IMAGES[step as keyof typeof ONBOARDING_IMAGES]}
          alt={`Onboarding step ${step}`}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Box>

      {/* Title */}
      <Typography
        variant="h4"
        align="center"
        sx={{
          color: "#fff",
          fontWeight: "bold",
          mb: 2,
          width: screenSize === "sm" || screenSize === "md" ? "100%" : "60%",
        }}
      >
        {t(`onboarding.step${step}.title`)}
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="body1"
        align="center"
        sx={{
          color: "#fff",
          mb: 4,
          width: screenSize === "sm" || screenSize === "md" ? "100%" : "60%",
        }}
      >
        {t(`onboarding.step${step}.subtitle`)}
      </Typography>

      {/* Start Button */}
      {step === 4 && (
        <CustomButton
          text={t("common.start")}
          onClick={handleStart}
          variantType={screenSize === "sm" || screenSize === "md" ? "secondary-fill" : "primary"}
          sx={{
            mt: 5,
            width: screenSize === "sm" || screenSize === "md" ? "100%" : "60%",
          }}
        />
      )}
    </Box>
  );

  const renderNavigationButtons = () => (
    <Box
      sx={{
        display: { xs: "none", lg: "flex" },
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        width: "100%",
        position: "absolute",
        top: "50%",
        left: 0,
        right: 0,
        transform: "translateY(-50%)",
        zIndex: 1,
      }}
    >
      {currentStep > 1 && (
        <Box
          component="img"
          src={nextIcon}
          alt="prev"
          sx={{
            width: "1.5rem",
            height: "1.5rem",
            cursor: "pointer",
            transform: "rotate(180deg)",
            transition: "transform 0.2s ease-in-out",
            position: "absolute",
            left: "10%",
            "&:hover": {
              transform: "rotate(180deg) scale(1.15)",
            },
          }}
          onClick={handlePrev}
        />
      )}
      {currentStep < 4 && (
        <Box
          component="img"
          src={nextIcon}
          alt="next"
          sx={{
            width: "1.5rem",
            height: "1.5rem",
            cursor: "pointer",
            transition: "transform 0.2s ease-in-out",
            position: "absolute",
            right: "10%",
            "&:hover": {
              transform: "scale(1.15)",
            },
          }}
          onClick={handleNext}
        />
      )}
    </Box>
  );

  const renderDots = () =>
    currentStep !== 4 &&
    !(direction === "left" && currentStep === 3) && (
      <Box
        sx={{
          display: "flex",
          gap: 2,
          position: "absolute",
          bottom: {
            xs: "12.5%",
            sm: "22.5%",
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
    );

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        backgroundColor: "#1E1E1E",
        position: "relative",
        overflow: "hidden",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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
            transform: "scale(1.15)",
          },
          position: "absolute",
          top: "1em",
          left: "1em",
          zIndex: 1,
        }}
        onClick={handleBack}
      />

      <Box
        sx={{
          width: { xs: "100%", lg: "50%" },
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: "0", lg: "4em" },
          position: "relative",
        }}
      >
        {renderNavigationButtons()}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {[1, 2, 3, 4].map((step) => renderStepContent(step))}
        </Box>
        {renderDots()}
      </Box>

      <Box
        sx={{
          width: { xs: "100%", lg: "50%" },
          height: "100%",
          display: { xs: "none", lg: "flex" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "90%",
            height: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {[1, 2, 3, 4].map((step) => (
            <Box
              key={step}
              sx={{
                position: "absolute",
                top: "5%",
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                opacity: currentStep === step ? 1 : 0,
                transition: "opacity 0.3s ease-in-out",
              }}
            >
              <Box
                sx={{
                  width: "75%",
                  aspectRatio: "1/1",
                }}
              >
                <img
                  src={ONBOARDING_IMAGES[step as keyof typeof ONBOARDING_IMAGES]}
                  alt={`Onboarding step ${step}`}
                  style={{ width: "100%", height: "auto", objectFit: "contain" }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Onboarding;
