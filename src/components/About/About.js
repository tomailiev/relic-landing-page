import { Box, Divider, Paper, Typography, useTheme } from "@mui/material";
import { Container } from "@mui/system";
import Bio from "./Bio";
import founders from '../../data/founders.json';
import aboutBg from '../../imgs/aboutbg_grayscale.jpg';

const About = () => {
    const theme = useTheme();

    const boxShadow = '0px 0px 0px 8px #000000, 0px 0px 0px 16px #4B4C4B, 0px 0px 0px 24px #828482, 0px 0px 0px 31px #B2B5B2, 5px 5px 15px 5px rgba(0,0,0,0)';

    const tc = (
        <Container maxWidth={'md'} sx={{ m: 5 }}>
            <Typography variant="h3" textAlign={'start'} fontFamily="tangerine">
                Our mission
            </Typography>
            <Divider />
            <Box textAlign={'left'} sx={{ my: 3 }}>
            <Paper sx={{ padding: 5 }}>
                <Typography fontSize={18}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci minus distinctio ab molestiae natus sequi similique placeat totam? Nulla eligendi, accusamus minus adipisci odit, id aliquam facilis enim ut officiis laboriosam sequi nemo sunt beatae, voluptas dolorum maiores. Nulla itaque distinctio voluptates possimus dolores? Porro officia enim recusandae id non ipsa, ad hic voluptatem velit autem sint eligendi? Quas, quia nihil officiis corporis odio laborum provident minima, eligendi veniam architecto blanditiis, sed accusantium hic animi.
                </Typography>
            </Paper>
            </Box>
        </Container>
    );


    return (
        <>
            <Container maxWidth="md" sx={{ m: 5, textAlign: 'center' }}>
                <Typography fontFamily="tangerine" variant="h2" >
                    About us
                </Typography>
            </Container>
            {/* <Banner bgUrl={aboutBg} textComponent={tc} height={500} /> */}
            <Container
                maxWidth="md"
                display="flex"
                flexDirection="column"
                alignItems={"center"}
                justifyContent="center"
               
            >
                <img src={aboutBg} width='100%' alt="About banner" style={{ boxShadow: boxShadow, WebkitBoxShadow: boxShadow }} />
            </Container>
            <Divider />
            {tc}
            <Container maxWidth="md" sx={{ m: 5, textAlign: 'center' }}>
                <Typography variant="h3" textAlign={'start'} fontFamily="tangerine" color={theme.palette.grey[900]}>
                    Our founders
                </Typography>
                {founders.map(({ name, pic, bio }, i) => {
                    return (
                        <Bio key={name} picRight={i % 2} name={name} bio={bio} picUrl={pic} />
                    );
                })}
            </Container>
        </>
    )
}
export default About;