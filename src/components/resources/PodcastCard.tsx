import React from "react"
import { Box, Typography, Card, CardContent } from "@mui/material"

interface PlaylistCardProps {
  avatar: string
  title: string
  description: string
  image: string
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ avatar, title, description, image }) => {
  return (
    <Card
      sx={{
        width: "100%",
        height: "7.52rem",
        borderRadius: "1.13rem",
        backgroundColor: "#f5f5f5",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        display: "flex",
        alignItems: "center",
        padding: "0.5rem",
      }}
    >
      {/* Аватар слева */}
      <Box
        component="img"
        src={avatar}
        alt={`Avatar for ${title}`}
        sx={{
          width: "60.2px",
          height: "60.2px",
          marginRight: "1rem",
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />

      {/* Текст в центре */}
      <CardContent
        sx={{
          flex: 1,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: "#333",
            fontWeight: "bold",
            textAlign: "left",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#757575",
            textAlign: "left",
          }}
        >
          {description}
        </Typography>
      </CardContent>

      {/* Картинка справа */}
      <Box
        component="img"
        src={image}
        alt={`Image for ${title}`}
        sx={{
          width: "120.39px",
          height: "122.18px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
    </Card>
  )
}

export default PlaylistCard
