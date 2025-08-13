import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useContacts } from '../hooks/useContacts';
import useScreenSize from '../hooks/useScreenSize';
import theme from '../theme';
import type { Contact } from '../services/contacts';

export default function Contacts() {
  const { localContacts, internationalContacts, userCountry, isLoading } = useContacts();
  const { t } = useTranslation();
  const screenSize = useScreenSize();

  const renderContactCard = (contact: Contact, isLocal: boolean = false) => (
    <Box 
      key={contact.id}
      sx={{
        backgroundColor: isLocal ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
        padding: isLocal ? 4 : 3,
        borderRadius: 2,
        border: isLocal ? '2px solid #FFD700' : '1px solid rgba(255, 255, 255, 0.2)',
        marginBottom: 3,
        height: 'fit-content',
      }}
    >
      <Typography variant={isLocal ? "h4" : "h6"} color="#fff" fontWeight="bold">
        {contact.name}
      </Typography>
      
      <Typography variant="body1" color="#fff" sx={{ opacity: 0.9, mt: 1 }}>
        {contact.description}
      </Typography>
      
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {contact.phone && (
          <Typography variant="body2" color={theme.colors.yellow}>
            📞 {contact.phone}
          </Typography>
        )}
        
        {contact.email && (
          <Typography variant="body2" color={theme.colors.yellow}>
            ✉️ {contact.email}
          </Typography>
        )}
        
        <Typography variant="body2" color="#fff" sx={{ opacity: 0.7 }}>
          📍 {contact.location} • {contact.category}
        </Typography>
        
        {contact.url && (
          <Button
            variant="outlined"
            href={contact.url}
            target="_blank"
            sx={{ 
              mt: 1, 
              borderColor: theme.colors.yellow,
              color: theme.colors.yellow,
              '&:hover': { backgroundColor: theme.colors.yellow, color: '#000' }
            }}
          >
            {t('/contacts.visitWebsite')}
          </Button>
        )}
      </Box>
    </Box>
  );

  const renderLegacyContact = (contact: { name: string }) => (
    <Box key={contact.name} mb={4}>
      <Typography variant="h4" color={'#fff'} mb={2}>
        {contact.name}
      </Typography>
      <Typography variant="body1" fontWeight={100} color={'#fff'} mb={1}>
        {t(`/contacts.contacts.${contact.name}.description`)}
      </Typography>
      <Typography variant="body1" fontWeight={100} color={theme.colors.yellow} mb={1}>
        {t(`/contacts.contacts.${contact.name}.schedule`)}
      </Typography>
      <Typography variant="body1" fontWeight={100} color={theme.colors.yellow}>
        {t(`/contacts.contacts.${contact.name}.phone`)}
      </Typography>
    </Box>
  );

  const isLargeScreen = screenSize === 'lg' || screenSize === 'xl';

  return (
    <Box
      minHeight="100vh"
      sx={{ backgroundColor: theme.colors.defaultBackground }}
      px={screenSize === 'sm' ? 3 : 12.5}
      pt={12.5}
    >
      <Typography variant="h2" color="#fff" mb={4}>
        {t('/contacts.title')}
      </Typography>

      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress sx={{ color: theme.colors.yellow }} />
        </Box>
      ) : (
        <>
          {/* Check if we have new-format contacts (with id, description, etc.) */}
          {localContacts.length > 0 || internationalContacts.length > 0 ? (
            <>
              {/* LOCAL RESOURCES - PROMINENT SECTION */}
              <Box mb={6}>
                <Typography variant="h3" color={theme.colors.yellow} mb={3}>
                  🏠 {t('/contacts.localResources', { country: userCountry })}
                </Typography>
                
                <Box sx={{ 
                  backgroundColor: 'rgba(255, 215, 0, 0.1)', 
                  padding: 4, 
                  borderRadius: 3,
                  border: '2px solid rgba(255, 215, 0, 0.3)'
                }}>
                                     {localContacts.length > 0 ? (
                     <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                       {localContacts.map(contact => (
                         <Box key={contact.id}>
                           {renderContactCard(contact, true)}
                         </Box>
                       ))}
                     </Box>
                   ) : (
                    <Typography color="#fff" textAlign="center">
                      {t('/contacts.noLocalResources')}
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* INTERNATIONAL RESOURCES - SMALLER SECTION */}
              {internationalContacts.length > 0 && (
                <Box>
                  <Typography variant="h4" color="#fff" mb={3} sx={{ opacity: 0.8 }}>
                    🌍 {t('/contacts.internationalResources')}
                  </Typography>
                  
                                     <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
                     {internationalContacts.map(contact => (
                       <Box key={contact.id}>
                         {renderContactCard(contact, false)}
                       </Box>
                     ))}
                   </Box>
                </Box>
              )}
            </>
          ) : (
            /* FALLBACK: Legacy format for backward compatibility */
            <Box px={isLargeScreen ? 10 : 0}>
              <Typography variant="h4" color="#fff" mb={4} sx={{ opacity: 0.8 }}>
                📞 Available Resources
              </Typography>
              {isLargeScreen ? (
                <Box display="flex" gap={4}>
                  <Box flex={1}>
                    {['Centro de Atención al Suicida (CAS)', 'Programa Nacional de Prevención del Suicidio'].map(name => (
                      <div key={name}>{renderLegacyContact({ name })}</div>
                    ))}
                  </Box>
                  <Box flex={1}>
                    {['Salud Mental', 'Atención a Niñas, Niños y Adolescentes', 'Sistema de Atención Médica de Emergencias (SAME)'].map(name => (
                      <div key={name}>{renderLegacyContact({ name })}</div>
                    ))}
                  </Box>
                </Box>
              ) : (
                <>
                  {['Centro de Atención al Suicida (CAS)', 'Programa Nacional de Prevención del Suicidio', 'Salud Mental', 'Atención a Niñas, Niños y Adolescentes', 'Sistema de Atención Médica de Emergencias (SAME)'].map(name => (
                    <div key={name}>{renderLegacyContact({ name })}</div>
                  ))}
                </>
              )}
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
