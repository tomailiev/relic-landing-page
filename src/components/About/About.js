import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import Bio from "./Bio";

const About = () => {

    return (
        <Container maxWidth="md" sx={{m: 5, textAlign: 'center'}}>
            <Typography fontFamily="tangerine" variant="h2" >
                This is Relic
            </Typography>
            <Bio />
            <Bio />
        </Container>
    );
};

export default About;