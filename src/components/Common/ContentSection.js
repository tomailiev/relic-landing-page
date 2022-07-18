import { Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";

const ContentSection = () => {

    return (
        <Container maxWidth="lg" >
            <Paper elevation={2} sx={{my: 2}}>
                <Typography variant="h3" textAlign={'center'}>
                    What's new
                </Typography>
            </Paper>

        </Container>
    );
};

export default ContentSection;