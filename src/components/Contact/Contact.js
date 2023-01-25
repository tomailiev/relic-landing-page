import { Typography, useTheme } from "@mui/material";
import { Container } from "@mui/system";
import ContactForm from "./ContactForm"

const Contact = () => {
    const theme = useTheme();

    return (
        <Container maxWidth="sm" sx={{ my: 5, textAlign: 'center' }}>
            <Typography variant="h3" >
                Contact Us
            </Typography>
            <Container disableGutters sx={{ background: theme.palette.secondary.light, px: 5, py: 2, my: 2 }}>
                <ContactForm />
            </Container>
        </Container>
    );
};

export default Contact;