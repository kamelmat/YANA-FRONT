import { Box, Typography, Container, Grid } from "@mui/material"
import theme from "../theme"
import Logo from "../assets/branding/yana.svg"
import { useLocation } from "react-router-dom"
import { useScreenSize } from "../hooks/useScreenSize"

export const Footer = () => {
  const location = useLocation().pathname
  const screenSize = useScreenSize()

  if (location === "login" || location === "/") return null

  const sidebarWidth = screenSize === "sm" ? 0 : theme.sidebar?.width

  return (
    <Box
      component="footer"
      sx={{
        background: theme.gradients.gradientPurpleToBottom,
        color: "white",
        padding: 2,
        py: 4,
        pb: 10,
        width: `calc(100% - ${sidebarWidth}px)`,
        marginLeft: `${sidebarWidth}px`,
        position: "relative",
        ...(screenSize === "sm" && {
          width: "100%",
          marginLeft: 0,
        }),
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={4}
          sx={{
            justifyContent: "space-between",
            px: { xs: 2, md: 0 },
            alignItems: "flex-start",
          }}
        >
          <Grid
            sx={{
              flex: { xs: "0 0 100%", md: "0 0 33.3333%" },
              maxWidth: { xs: "100%", md: "33.3333%" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 2,
                justifyContent: "flex-start",
              }}
            >
              <img src={Logo} alt="Logo YouAreNotAlone" style={{ width: 40, height: 40 }} />
              <Typography variant="h4" fontSize={32}>
                You are not alone
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ maxWidth: { xs: 400, sm: 300 } }}>
              ©2025 You are not alone - Todos los derechos reservados
            </Typography>
            <Typography variant="body2" sx={{ maxWidth: { xs: 400, sm: 300 }, mt: 2 }}>
              YANA S. de R.L. de C.V. Renato Peña 490 Sur, Centro. Monterrey, Nuevo León, México.
              C.P. 6400
            </Typography>
          </Grid>

          <Grid
            sx={{
              flex: { xs: "0 0 100%", md: "0 0 16.6666%" },
              maxWidth: { xs: "100%", md: "16.6666%" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography variant="h5" sx={{ mb: -1 }} gutterBottom>
                Productos
              </Typography>
              <Typography variant="body2">Apoyo</Typography>
              <Typography variant="body2">Asistencia médica</Typography>
              <Typography variant="body2">Recursos</Typography>
            </Box>
          </Grid>

          <Grid
            sx={{
              flex: { xs: "0 0 100%", md: "0 0 16.6666%" },
              maxWidth: { xs: "100%", md: "16.6666%" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography variant="h5" sx={{ mb: -1 }} gutterBottom>
                Legal
              </Typography>
              <Typography variant="body2">Términos</Typography>
              <Typography variant="body2">Condiciones</Typography>
              <Typography variant="body2">Privacidad</Typography>
            </Box>
          </Grid>

          <Grid>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Contacto
              </Typography>
              <Typography variant="body2">Info@yana.com</Typography>
              <Box sx={{ display: "flex", mt: 2, gap: 2 }}>
                <img
                  src="src/assets/icons/Instagram.svg"
                  alt="Instagram"
                  style={{ width: 52, height: 40 }}
                />
                <img
                  src="src/assets/icons/Linkedin.svg"
                  alt="LinkedIn"
                  style={{ width: 52, height: 40 }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Footer
