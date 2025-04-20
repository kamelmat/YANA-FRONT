import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Divider, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import SearchIcon from '@mui/icons-material/Search'
import theme from '../theme'
import { useSettingsStore } from '../store/useSettingsStore'
import useScreenSize from '../hooks/useScreenSize'

const FAQ = () => {
  const { t } = useTranslation()
  const { settings } = useSettingsStore()
  const [expanded, setExpanded] = useState<string | false>(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const faqItems = t('/FAQ.questions', { returnObjects: true }) as Array<{
    question: string
    answer: string
  }>

  const filteredItems = faqItems.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Box sx={{ 
      width: '100%',
      minHeight: '100vh',
      backgroundColor: settings.customization 
        ? theme.colors[settings.customization as keyof typeof theme.colors] 
        : theme.colors.defaultBackground ,
      pl: { xs: 0, sm: theme.sidebar?.width ?? 0, lg: 0 },
    }}>
      <Box display="flex" flexDirection="column" alignItems="center" sx={{ maxWidth: 1000, mx: 'auto', px: 3, pt: { xs: 8, sm: "5%" }, pb: useScreenSize() === "sm" ? 10 : 0 }}>
        {useScreenSize() !== "sm" && 
          <Typography variant="h1" component="h1" gutterBottom align="center" color="white">
            {t('/FAQ.title')}
          </Typography>
        }

        <TextField
          fullWidth
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            my: { xs: 0.5, sm: 2.5 },
            backgroundColor: 'white',
            width: { xs: '100%', md: '80%' },
            padding: '1% 0',
            borderRadius: 4,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: 'transparent',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent',
              },
            },
          }}
          slotProps={{
            input: {
              startAdornment: <SearchIcon sx={{ color: 'black', mr: 1, fontSize: '1.5rem' }} />,
            },
          }}
        />
        
        {filteredItems.map((item, index) => (
          <Accordion
            key={index + "faq_accordion"}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            sx={{
              mb: 2,
              boxShadow: 0,
              width: '100%',
              '&:before': {
                display: 'none',
              },
            }}
          >
            <AccordionSummary
              expandIcon={expanded === `panel${index}` ? <RemoveIcon /> : <AddIcon />}
              sx={{
                backgroundColor: 'white',
                '& .MuiAccordionSummary-content': {
                  margin: '12px 0',
                },
              }}
            >
              <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                {item.question}
              </Typography>
            </AccordionSummary>
            <Divider sx={{ backgroundColor: 'black' }} />
            <AccordionDetails>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  )
}

export default FAQ 