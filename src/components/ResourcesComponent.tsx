import React from "react"
import { Box, Typography, Card, CardContent, Button } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import theme from "../theme"

const ResourcesComponent: React.FC = () => {
  return (
    <Box
      sx={{
        padding: "7.5rem 6.32rem 3.13rem 14.69rem",
        backgroundColor: theme.colors.blackBackground,
        color: "#fff",
      }}
    >
      {/* Meditaciones */}

      <Box
        sx={{
          position: "relative",
        }}
      >
        <Typography variant="h1" sx={{ marginBottom: 2 }}>
          Meditaciones
        </Typography>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView={4}
          navigation // Включаем стрелки
          pagination={false}
          breakpoints={{
            1024: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 3,
            },
            480: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1,
            },
          }}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <SwiperSlide key={`meditation-${index}`}>
              <Card
                sx={{
                  width: "100%",
                  height: "24.94rem",
                  border: "1px solid #e0e0e0",
                  borderRadius: "10.56px",
                  backgroundColor: "#f5f5f5",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "сenter",
                }}
              >
                {/* Card content */}
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
                  Meditation {index + 1}
                </Typography>
                <Box
                  component="img"
                  src={`https://picsum.photos/327/200?random=${index + 1}`}
                  alt={`Meditation ${index + 1}`}
                  sx={{
                    width: "100%",
                    height: "60%",
                    objectFit: "cover",
                  }}
                />
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
                    El texto de meditación {index + 1}. Aqui puedes agregar más información.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      textTransform: "none",
                      borderRadius: "20px",
                      width: "7rem",
                      height: "2.2rem",
                      marginLeft: "auto",
                    }}
                  >
                    Acceder
                  </Button>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Podcasts */}
      <Box sx={{ marginBottom: 4, marginTop: "2rem" }}>
        <Typography variant="h1" sx={{ marginBottom: 2 }}>
          Podcasts
          <Typography component="span" variant="body1" sx={{ color: theme.colors.lightGray }}>
            (recomendados)
          </Typography>
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {Array.from({ length: 7 }).map((_, index) => (
            <Card
              key={`podcast-${index}`}
              sx={{
                width: "41.2rem",
                height: "7.52rem",
                borderRadius: "1.13rem",
                backgroundColor: "#f5f5f5",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent>
                <Typography variant="body1">{`Podcast ${index + 1}`}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Playlists */}
      <Box sx={{ marginBottom: 4, marginTop: "2rem" }}>
        <Typography variant="h1" sx={{ marginBottom: 2 }}>
          Playlists
        </Typography>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={4}
          navigation
          pagination={false}
          breakpoints={{
            1728: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1440: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            480: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
          }}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <SwiperSlide key={`playlist-${index}`}>
              <Card
                sx={{
                  width: "100%",
                  height: "27.41rem",
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
                {/* Image */}
                <Box
                  component="img"
                  src={`https://picsum.photos/327/200?random=${index + 1}`}
                  alt={`playlist ${index + 1}`}
                  sx={{
                    width: "99%",
                    height: "10.14rem",
                    objectFit: "cover",
                  }}
                />

                {/* Title */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    padding: "0.5rem",
                    backgroundColor: "#f0f0f0",
                    width: "100%",
                  }}
                >
                  Playlist {index + 1}
                </Typography>

                {/* Disctiption */}
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "1rem",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#757575",
                      textAlign: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    Это описание playlist {index + 1}. Здесь можно добавить больше информации.
                  </Typography>

                  {/* Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      textTransform: "none",
                      borderRadius: "20px",
                      width: "7rem",
                      height: "2.2rem",
                      marginLeft: "auto",
                    }}
                  >
                    Escuchar
                  </Button>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Banner */}
      <Box
        sx={{
          width: "97vw",
          height: "26.47rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          padding: "2.34rem 1rem 4.22rem 6.13rem",
          marginLeft: "-14.69rem",
          marginRight: "-6.32rem",
          marginTop: "4rem",
          backgroundImage: `url(/src/assets/resources/banner.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          sx={{
            width: "30%",
            height: "80%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            margin: "3rem 3rem 4rem 6rem",
            gap: "1.5rem",
          }}
        >
          <Typography variant="h1">Enfoca tu mente, relaja tu cuerpo.</Typography>
          <Typography variant="h3">Ingresa a un ambiente sonoro distinto.</Typography>
          <Button
            component="a"
            href="https://binaurapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              width: "254px",
              height: "58px",
              borderRadius: "100px",
              border: "1px solid #fff",
              backgroundColor: "transparent",
              color: "#fff",
              textTransform: "none",
              fontSize: "16px",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            Descargar app
          </Button>
        </Box>
        <Box
          component="a"
          href="https://binaurapp.com/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            width: "25%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            color: "#fff",
            textTransform: "none",
            fontSize: "16px",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          <img src="/src/assets/resources/binaur.png" alt="binaur" />
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Binaurapp
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default ResourcesComponent
