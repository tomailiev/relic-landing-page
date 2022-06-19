import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import Bio from "./Bio";
import founders from '../../data/founders.json';

const About = () => {

    return (
        <Container maxWidth="md" sx={{ m: 5, textAlign: 'center' }}>
            <Typography fontFamily="tangerine" variant="h2" >
                About us
            </Typography>
            {founders.map(({ name, pic, bio }, i) => {
                return (
                    <Bio key={name} picRight={i % 2} name={name} bio={bio} picUrl={pic} />
                );
            })}
        </Container>
    );
};

export default About;