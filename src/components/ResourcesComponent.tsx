import React from "react"
import { Box, Typography, Card, CardContent, Button } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import theme from "../theme"
import useScreenSize from "../hooks/useScreenSize"

const ResourcesComponent: React.FC = () => {
  const screenSize = useScreenSize()

  return (
    <Box
      sx={{
        padding:
          screenSize === "sm"
            ? "6rem 1rem 8rem 1rem"
            : screenSize === "md"
            ? "6rem 3rem 1rem 7rem"
            : "7.5rem 6.32rem 3.13rem 14.69rem",
        backgroundColor: theme.colors.blackBackground,
        color: "#fff",
      }}
    >
      {/* Meditaciones */}
      <Box>
        <Typography
          sx={{
            marginBottom: 2,
            typography: screenSize === "sm" ? "h4" : screenSize === "md" ? "h3" : "h1",
          }}
        >
          Meditaciones
        </Typography>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={screenSize === "sm" ? 8 : screenSize === "md" ? 12 : 16}
          slidesPerView={
            screenSize === "sm" ? 1 : screenSize === "md" ? 2 : screenSize === "lg" ? 3 : 4
          }
          navigation={screenSize === "lg"}
          pagination={{
            clickable: true,
            el: ".meditation-pagination",
            enabled: screenSize === "sm" || screenSize === "md",
          }}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <SwiperSlide key={`meditation-${index}`}>
              <Card
                sx={{
                  width: "100%",
                  height:
                    screenSize === "sm" ? "304.34px" : screenSize === "md" ? "22rem" : "24.94rem",
                  maxHeight: "399px",
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
                    height: screenSize === "sm" ? "140.14px" : "60%",
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
                    sx={{
                      textTransform: "none",
                      borderRadius: "20px",
                      width: screenSize === "sm" ? "75.78px" : "7rem",
                      height: "2.2rem",
                      marginLeft: "auto",
                      backgroundColor: theme.colors.lightBlue,
                    }}
                  >
                    Acceder
                  </Button>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
        {(screenSize === "sm" || screenSize === "md") && (
          <Box
            className="meditation-pagination"
            sx={{
              marginTop: "1.5rem",
              justifyContent: "center",
              display: "flex",
              gap: 1,
              "& .swiper-pagination-bullet": {
                backgroundColor: theme.colors.lightGray,
                opacity: 0.7,
                width: "8px",
                height: "8px",
              },
              "& .swiper-pagination-bullet-active": {
                backgroundColor: "gray",
              },
            }}
          />
        )}
      </Box>

      {/* Podcasts */}
      <Box sx={{ marginBottom: 4, marginTop: "2rem" }}>
        <Typography
          sx={{
            marginBottom: 2,
            typography: screenSize === "sm" ? "h4" : screenSize === "md" ? "h3" : "h1",
          }}
        >
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
          {Array.from({ length: screenSize === "lg" ? 7 : 4 }).map((_, index) => (
            <Card
              key={`podcast-${index}`}
              sx={{
                width: screenSize === "sm" ? "100%" : screenSize === "md" ? "100%" : "41.2rem",
                height: screenSize === "sm" ? "80px" : screenSize === "md" ? "6.5rem" : "7.52rem",
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
        <Typography
          sx={{
            marginBottom: 2,
            typography: screenSize === "sm" ? "h4" : screenSize === "md" ? "h3" : "h1",
          }}
        >
          Playlists
        </Typography>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={screenSize === "sm" ? 8 : screenSize === "md" ? 12 : 16}
          slidesPerView={
            screenSize === "sm" ? 1 : screenSize === "md" ? 2 : screenSize === "lg" ? 3 : 4
          }
          navigation={screenSize === "lg"}
          pagination={{
            clickable: true,
            el: ".playlist-pagination",
            enabled: screenSize === "sm" || screenSize === "md",
          }}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <SwiperSlide key={`playlist-${index}`}>
              <Card
                sx={{
                  width: "100%",
                  height:
                    screenSize === "sm" ? "315.67px" : screenSize === "md" ? "23rem" : "27.41rem",
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
                    height:
                      screenSize === "sm" ? "10.14rem" : screenSize === "md" ? "9rem" : "12rem",
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
                    Playlist {index + 1}. Aquí puedes agregar más información.
                  </Typography>

                  {/* Button */}
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      borderRadius: "20px",
                      width: screenSize === "sm" ? "75.78px" : "7rem",
                      height: "2.2rem",
                      marginLeft: "auto",
                      backgroundColor: theme.colors.lightBlue,
                    }}
                  >
                    Escuchar
                  </Button>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
        {(screenSize === "sm" || screenSize === "md") && (
          <Box
            className="playlist-pagination"
            sx={{
              marginTop: "1.5rem",
              justifyContent: "center",
              display: "flex",
              gap: 1,
              "& .swiper-pagination-bullet": {
                backgroundColor: theme.colors.lightGray,
                opacity: 0.7,
                width: "8px",
                height: "8px",
              },
              "& .swiper-pagination-bullet-active": {
                backgroundColor: "gray",
              },
            }}
          />
        )}
      </Box>

      {/* Banner */}
      <Box
        sx={{
          width: screenSize === "sm" ? "100%" : screenSize === "md" ? "98vw" : "97vw",
          height: screenSize === "sm" ? "7.5rem" : screenSize === "md" ? "18rem" : "26.47rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          padding:
            screenSize === "sm"
              ? "0.5rem 1rem"
              : screenSize === "md"
              ? "2rem 1rem 3rem 4rem"
              : "2.34rem 1rem 4.22rem 6.13rem",
          marginLeft: screenSize === "sm" ? 0 : screenSize === "md" ? "-8rem" : "-14.69rem",
          marginRight: screenSize === "sm" ? 0 : screenSize === "md" ? "-4rem" : "-6.32rem",
          marginTop: screenSize === "sm" ? "2rem" : "4rem",
          backgroundImage: `url(/src/assets/resources/banner.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: screenSize === "sm" ? "10px" : 0,
        }}
      >
        <Box
          sx={{
            width: "60%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            margin:
              screenSize === "sm"
                ? 0
                : screenSize === "md"
                ? "2rem 2rem 3rem 4rem"
                : "3rem 3rem 4rem 6rem",
            gap: screenSize === "sm" ? "0.1rem" : "1.5rem",
          }}
        >
          <Typography
            sx={{ typography: screenSize === "sm" ? "body1" : screenSize === "md" ? "h3" : "h1" }}
          >
            Enfoca tu mente, <br />
            relaja tu cuerpo.
          </Typography>
          <Typography
            sx={{ typography: screenSize === "sm" ? "body3" : screenSize === "md" ? "h6" : "h3" }}
          >
            Ingresa a un ambiente sonoro <br />
            distinto.
          </Typography>
          <Button
            component="a"
            href="https://binaurapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              width: screenSize === "sm" ? "69.33px" : screenSize === "md" ? "180px" : "254px",
              height: screenSize === "sm" ? "15.83px" : screenSize === "md" ? "35px" : "58px",
              borderRadius: screenSize === "sm" ? "27.3px" : "6.25rem",
              border: screenSize === "sm" ? "0.27px solid #FFFFFF" : "1px solid #fff",
              backgroundColor: "transparent",
              color: "#fff",
              textTransform: "none",
              fontSize: screenSize === "sm" ? "4.37px" : screenSize === "md" ? "12px" : "16px",
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
          <Box
            component="img"
            src="/src/assets/resources/binaur.png"
            alt="binaur"
            sx={{
              width: screenSize === "sm" ? "58.96px" : screenSize === "md" ? "120px" : "100%",
              height: screenSize === "sm" ? "58.96px" : screenSize === "md" ? "120px" : "100%",
            }}
          />
          <Typography
            sx={{
              textAlign: "center",
              typography: screenSize === "sm" ? "body1" : screenSize === "md" ? "h6" : "h4",
            }}
          >
            Binaurapp
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default ResourcesComponent
