import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import ContactForm from "./ContactForm"

const Contact = () => {
    return (
        <Container maxWidth="sm" sx={{ my: 5, textAlign: 'center' }}>
            <Typography variant="h3" >
                Contact Us
            </Typography>
            <ContactForm />
        </Container>
    );
};

export default Contact;