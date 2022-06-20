import { Divider, Typography, useTheme } from "@mui/material";
import { Container } from "@mui/system";
import Bio from "./Bio";
import founders from '../../data/founders.json';
import Banner from "../Home.js/Banner";
import aboutBg from '../../imgs/aboutbg.jpg';

const About = () => {
    const theme = useTheme();
    const tc = (
        <>
            <Typography variant="h3" textAlign={'start'} fontFamily="tangerine" color={theme.palette.grey[100]}>
                Our mission
            </Typography>
            <Divider light={true} variant={'middle'} />
            <Typography color={theme.palette.grey[100]} fontSize={18}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci minus distinctio ab molestiae natus sequi similique placeat totam? Nulla eligendi, accusamus minus adipisci odit, id aliquam facilis enim ut officiis laboriosam sequi nemo sunt beatae, voluptas dolorum maiores. Nulla itaque distinctio voluptates possimus dolores? Porro officia enim recusandae id non ipsa, ad hic voluptatem velit autem sint eligendi? Quas, quia nihil officiis corporis odio laborum provident minima, eligendi veniam architecto blanditiis, sed accusantium hic animi.
            </Typography>
        </>
    );


    return (
        <>
            <Container maxWidth="md" sx={{ m: 5, textAlign: 'center' }}>
                <Typography fontFamily="tangerine" variant="h2" >
                    About us
                </Typography>
            </Container>
            <Banner bgUrl={aboutBg} textComponent={tc} height={500} />
            {/* <Box width={'98vw'} height={500} display="flex" flexDirection="column" alignItems={"center"} justifyContent="center" sx={{background: `url(${aboutBg}) no-repeat center/contain`}}>
                <Box maxWidth={800} marginX={2}>
                    {tc}
                </Box>
            </Box> */}
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