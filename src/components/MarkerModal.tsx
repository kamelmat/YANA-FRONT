import { Dialog, DialogContent, Divider, Box, Typography } from "@mui/material"

interface MarkerModalProps {
  open: boolean
  onClose: () => void
  // userId: string | null
  position: { x: number; y: number } | null
}

export default function MarkerModal({ open, onClose, position }: MarkerModalProps) {
  const responses = [
    { text: "Estoy contigo, comparto lo que sientes", icon: "😿" },
    { text: "Cuentas con todo mi apoyo", icon: "😿" },
    { text: "¡Ánimo!", icon: "😿" },
    { text: "List item", icon: "😿" },
  ]

  console.log(position?.x, position?.y)

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "black",
          color: "white",
          minWidth: "250px",
          maxWidth: "400px",
          padding: 0,
          position: "absolute",
          top: position?.y ? position.y + 70 : 500,
          left: position?.x ? position.x + 115 : 1000,
          transform: "translate(-50%, -50%)",
          transition: "top 0.3s, left 0.3s",
        },
      }}
    >
      <DialogContent sx={{ padding: 2 }}>
        {responses.map((response) => (
          <Box key={response.text}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 1,
              }}
            >
              <Typography variant="body2" sx={{ flex: 1 }}>
                {response.text}
              </Typography>
              <Box sx={{ marginLeft: 1 }}>{response.icon}</Box>
            </Box>
            {responses.indexOf(response) < responses.length - 1 && <Divider sx={{ borderColor: "gray", marginY: 1 }} />}
          </Box>
        ))}
      </DialogContent>
    </Dialog>
  )
}
