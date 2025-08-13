import { Box, Button, Divider, Skeleton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useContacts } from '../hooks/useContacts';
import useScreenSize from '../hooks/useScreenSize';
import theme from '../theme';
import type { Contact } from '../services/contacts';

export default function Contacts() {
  const { localContacts, internationalContacts, userCountry, contacts, isLoading } = useContacts();
  const { t } = useTranslation();
  const screenSize = useScreenSize();

  const renderContactPlaceholder = (index: number) => (
    <Box key={`placeholder-${index}`} mb={4}>
      <Skeleton
        variant="text"
        width="60%"
        height={40}
        sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
      />
      <Skeleton
        variant="text"
        width="80%"
        height={24}
        sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
      />
      <Skeleton
        variant="text"
        width="70%"
        height={24}
        sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
      />
      <Skeleton
        variant="text"
        width="70%"
        height={24}
        sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
      />
    </Box>
  );

  // New format contact card with enhanced styling
  const renderNewFormatContact = (contact: Contact, isLocal: boolean = false) => (
    <Box key={contact.id}>
      <Box 
        mb={4} 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 2,
          padding: isLocal ? 3 : 2,
          backgroundColor: isLocal ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
          borderRadius: isLocal ? 2 : 0,
          border: isLocal ? '1px solid rgba(255, 215, 0, 0.3)' : 'none',
        }}
      >
        <Typography variant="h4" color={isLocal ? theme.colors.yellow : '#fff'} fontWeight={isLocal ? 'bold' : 'normal'}>
          {contact.name}
        </Typography>
        <Typography variant="body1" fontWeight={100} color={'#fff'}>
          {contact.description}
        </Typography>
        {contact.phone && (
          <Typography variant="body1" fontWeight={100} color={theme.colors.yellow}>
            📞 {contact.phone}
          </Typography>
        )}
        {contact.email && (
          <Typography variant="body1" fontWeight={100} color={theme.colors.yellow}>
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
            size="small"
            sx={{ 
              alignSelf: 'flex-start',
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

  // Original format contact (for backward compatibility)
  const renderOriginalContact = (contact: { name: string }, index: number, array: { name: string }[]) => (
    <Box key={contact.name}>
      <Box mb={4} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4" color={'#fff'}>
          {contact.name}
        </Typography>
        <Typography variant="body1" fontWeight={100} color={'#fff'}>
          {t(`/contacts.contacts.${contact.name}.description`)}
        </Typography>
        <Typography variant="body1" fontWeight={100} color={theme.colors.yellow}>
          {t(`/contacts.contacts.${contact.name}.schedule`)}
        </Typography>
        <Typography variant="body1" fontWeight={100} color={theme.colors.yellow}>
          {t(`/contacts.contacts.${contact.name}.phone`)}
        </Typography>
      </Box>
      {index < array.length - 1 && (
        <Divider sx={{ borderColor: '#fff', width: '70%', margin: '0 auto 40px auto' }} />
      )}
    </Box>
  );

  const isLargeScreen = screenSize === 'lg' || screenSize === 'xl';

  // Check if we have new format contacts
  const hasNewFormatContacts = localContacts.length > 0 || internationalContacts.length > 0;

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      sx={{ backgroundColor: theme.colors.defaultBackground }}
      px={screenSize === 'sm' ? 3 : isLargeScreen ? 17.5 : 12.5}
      pt={12.5}
    >
      {isLargeScreen && (
        <Typography variant="h2" color={'#fff'} mb={4}>
          {t('/contacts.title')}
        </Typography>
      )}
      
      <Box px={isLargeScreen ? 10 : 0}>
        {isLoading ? (
          isLargeScreen ? (
            <Box display="flex" gap={4}>
              <Box flex={1}>{[0, 1, 2].map((index) => renderContactPlaceholder(index))}</Box>
              <Box flex={1}>{[3, 4].map((index) => renderContactPlaceholder(index))}</Box>
            </Box>
          ) : (
            <>{[0, 1, 2, 3, 4].map((index) => renderContactPlaceholder(index))}</>
          )
        ) : hasNewFormatContacts ? (
          /* NEW FORMAT: Location-aware display */
          <>
            {/* LOCAL RESOURCES - Enhanced but maintaining original style */}
            {localContacts.length > 0 && (
              <Box mb={6}>
                <Typography variant="h3" color={theme.colors.yellow} mb={4}>
                  🏠 {t('/contacts.localResources', { country: userCountry })}
                </Typography>
                
                {isLargeScreen ? (
                  <Box display="flex" gap={4}>
                    <Box flex={1}>
                      {localContacts.slice(0, Math.ceil(localContacts.length / 2)).map((contact, index, array) => (
                        <Box key={contact.id}>
                          {renderNewFormatContact(contact, true)}
                          {index < array.length - 1 && (
                            <Divider sx={{ borderColor: theme.colors.yellow, width: '70%', margin: '0 auto 40px auto', opacity: 0.5 }} />
                          )}
                        </Box>
                      ))}
                    </Box>
                    <Box flex={1}>
                      {localContacts.slice(Math.ceil(localContacts.length / 2)).map((contact, index, array) => (
                        <Box key={contact.id}>
                          {renderNewFormatContact(contact, true)}
                          {index < array.length - 1 && (
                            <Divider sx={{ borderColor: theme.colors.yellow, width: '70%', margin: '0 auto 40px auto', opacity: 0.5 }} />
                          )}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ) : (
                  localContacts.map((contact, index, array) => (
                    <Box key={contact.id}>
                      {renderNewFormatContact(contact, true)}
                      {index < array.length - 1 && (
                        <Divider sx={{ borderColor: theme.colors.yellow, width: '70%', margin: '0 auto 40px auto', opacity: 0.5 }} />
                      )}
                    </Box>
                  ))
                )}
              </Box>
            )}

            {/* INTERNATIONAL RESOURCES */}
            {internationalContacts.length > 0 && (
              <Box>
                <Typography variant="h4" color="#fff" mb={4} sx={{ opacity: 0.8 }}>
                  🌍 {t('/contacts.internationalResources')}
                </Typography>
                
                {isLargeScreen ? (
                  <Box display="flex" gap={4}>
                    <Box flex={1}>
                      {internationalContacts.slice(0, Math.ceil(internationalContacts.length / 2)).map((contact, index, array) => (
                        <Box key={contact.id}>
                          {renderNewFormatContact(contact, false)}
                          {index < array.length - 1 && (
                            <Divider sx={{ borderColor: '#fff', width: '70%', margin: '0 auto 40px auto' }} />
                          )}
                        </Box>
                      ))}
                    </Box>
                    <Box flex={1}>
                      {internationalContacts.slice(Math.ceil(internationalContacts.length / 2)).map((contact, index, array) => (
                        <Box key={contact.id}>
                          {renderNewFormatContact(contact, false)}
                          {index < array.length - 1 && (
                            <Divider sx={{ borderColor: '#fff', width: '70%', margin: '0 auto 40px auto' }} />
                          )}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ) : (
                  internationalContacts.map((contact, index, array) => (
                    <Box key={contact.id}>
                      {renderNewFormatContact(contact, false)}
                      {index < array.length - 1 && (
                        <Divider sx={{ borderColor: '#fff', width: '70%', margin: '0 auto 40px auto' }} />
                      )}
                    </Box>
                  ))
                )}
              </Box>
            )}
          </>
        ) : (
          /* FALLBACK: Original beautiful format for backward compatibility */
          <>
            {isLargeScreen ? (
              <Box display="flex" gap={4}>
                <Box flex={1}>
                  {contacts.slice(0, Math.ceil(contacts.length / 2)).map((contact, index, array) =>
                    renderOriginalContact(contact, index, array)
                  )}
                </Box>
                <Box flex={1}>
                  {contacts.slice(Math.ceil(contacts.length / 2)).map((contact, index, array) =>
                    renderOriginalContact(contact, index, array)
                  )}
                </Box>
              </Box>
            ) : (
              contacts.map((contact, index, array) => renderOriginalContact(contact, index, array))
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
