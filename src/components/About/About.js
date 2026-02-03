import { Typography, Container, Box, Grid, } from "@mui/material";
// import band from '../../assets/imgs/fndrs_grad.jpg';
import prog from '../../assets/imgs/portrait_co_grad.jpg';
import vert from '../../assets/imgs/sue_ed_grad.jpg';

const About = ({ content, pageTitle }) => {

    const imgs = [
        undefined,
        prog,
        vert,
        undefined,

    ];

    return (
        <Box textAlign={'center'} sx={{ background: '#000000', py: 2, minHeight: '100vh' }}>
            <Typography variant="h3" color="secondary" textAlign={'center'} fontWeight={600} my={8} mx={3}>
                {pageTitle}
            </Typography>
            <Container maxWidth={'lg'}>
                {content.map(({ textContent }, i) => {
                    return imgs[i]
                        ? <Grid container spacing={3} key={i}>
                            <Grid size={{ xs: 12, md: 6 }} order={{ xs: 0, md: i % 2 ? 1 : 0 }} mb={5}>
                                <Box maxHeight={'100%'}>
                                    <img src={imgs[i]} alt="Relic founders" style={{ maxWidth: '100%' }} />
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography textAlign={'justify'} color="secondary" variant="body1" fontWeight={600} fontSize={{ xs: '1.4em', md: '1.3em' }} mx={{ xs: 2, sm: 5, md: 2 }}>
                                    {textContent}
                                </Typography>
                            </Grid>
                        </Grid>
                        : <Typography key={i} textAlign={'justify'} color="secondary" variant="body1" fontWeight={600} fontSize={{ xs: '1.4em', md: '1.3em' }} mx={{ xs: 2, sm: 5, md: 2 }} mb={8} >
                            {textContent}
                        </Typography>
                })}
            </Container>
        </Box>
    );
};

export default About;