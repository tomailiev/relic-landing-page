import { Box, Container, Grid, Typography, Paper, useTheme } from '@mui/material';
import ContactForm from './ContactForm'; // Your existing component
import { useContext } from 'react';
import TextContext from '../../context/TextContext';
import Seo from '../Common/SEO';

const ContactPage = () => {

    const { text } = useContext(TextContext);
    const theme = useTheme();

    return (
        <Container maxWidth="md" sx={{ pb: { xs: 5, md: 10 } }}>
            <Seo title={'Contact Us'} description={'Get in touch for additional information and inquiries.'} />
            <Typography variant="h3" align="center" my={8}>
                Get in Touch
            </Typography>

            <Typography
                variant="body1"
                color="text.primary"
                align="left"
                sx={{ mx: 'auto', mb: 5 }}
            >
                For performance bookings, please reach out to our agent, <strong>{text.contactAgentName}</strong> at{' '}
                <a href={`mailto:${text.contactAgentEmail}`}>{text.contactAgentEmail}</a>. <br />
                For donation inquiries, contact our Development Manager, <strong>{text.contactDevName}</strong>, at{' '}
                <a href={`mailto:${text.contactDevEmail}`}>{text.contactDevEmail}</a>. <br />
                For general questions, use the form below and a member of our team will be in touch.
            </Typography>

            <Grid container spacing={4}>
                <Grid item size={{ xs: 12, md: 6 }}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 4,
                            height: '100%',
                            backgroundColor: theme.palette.mode === 'light' ? '#f9f9f9' : 'grey.900',
                            borderRadius: 3,
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Contact Information
                        </Typography>
                        <Typography variant="body1">
                            <strong>Mailing Address</strong><br />
                            {text.contactAddressStreet}<br />
                            {text.contactAddressCity}<br />
                            {text.contactAddressCountry}
                        </Typography>

                        <Box mt={2}>
                            <Typography variant="body1">
                                <strong>Phone:</strong> {text.contactPhoneNumber}<br />
                                <strong>Email:</strong> <a href="mailto:info@relicensemble.org">info@relicensemble.org</a>
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item size={{ xs: 12, md: 6 }}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 4,
                            borderRadius: 3,
                            backgroundColor: theme.palette.background.default,
                        }}
                    >
                        <ContactForm />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ContactPage;
