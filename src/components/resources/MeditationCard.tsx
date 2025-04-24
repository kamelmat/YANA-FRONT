import React from "react"
import { Box, Typography, Card, CardContent } from "@mui/material"
import CommonButton from "../../commons/CommonButton"
import useScreenSize from "../../hooks/useScreenSize"
import theme from "../../../theme"

interface MeditationCardProps {
  avatar: string
  title: string
  description: string
  id: number
}

const MeditationCard: React.FC<MeditationCardProps> = ({ avatar, title, description, id }) => {
  const screenSize = useScreenSize()

  return (
    <Card
      sx={{
        width: "100%",
        height: screenSize === "sm" ? "304.34px" : screenSize === "md" ? "22rem" : "24.94rem",
        maxHeight: "399px",
        border: "1px solid #e0e0e0",
        borderRadius: "10.56px",
        backgroundColor: "#f5f5f5",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Аватар */}
      <Box
        component="img"
        src={avatar}
        alt={`Avatar for ${title}`}
        sx={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          marginTop: "1rem",
        }}
      />
      {/* Заголовок */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          textAlign: "left",
          padding: "0.5rem",
          backgroundColor: "#f0f0f0",
          width: "100%",
        }}
      >
        {title}
      </Typography>
      {/* Изображение */}
      <Box
        component="img"
        src={avatar}
        alt={`Meditation ${id}`}
        sx={{
          width: "100%",
          height: screenSize === "sm" ? "140.14px" : "60%",
          objectFit: "cover",
        }}
      />
      {/* Описание и кнопка */}
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "1rem",
          height: "4.94rem",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#757575",
            marginBottom: "1rem",
            textAlign: "left",
          }}
        >
          {description}
        </Typography>
        <CommonButton
          text="Acceder"
          sx={{
            width: screenSize === "sm" ? "75.78px" : "7rem",
            height: "2.2rem",
            marginLeft: "auto",
            backgroundColor: theme.colors.lightBlue,
          }}
        />
      </CardContent>
    </Card>
  )
}

export default MeditationCard
