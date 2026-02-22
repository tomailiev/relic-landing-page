import { Typography, Container, Box, } from "@mui/material";
import band from '../../assets/imgs/fndrs_grad.jpg';

const Mission = ({ content, pageTitle }) => {


    return (
        <Box textAlign={'center'} sx={{ background: '#000000', py: 2, minHeight: '100vh' }}>
            <Typography variant="h3" color="secondary" textAlign={'center'} fontWeight={600} my={8} mx={3}>
                {pageTitle}
            </Typography>
            <Container maxWidth={'lg'}>
                <Typography textAlign={'left'} color="secondary" variant="body1" fontWeight={600} fontSize={{ xs: '1.4em', md: '1.3em' }} mx={{ xs: 2, sm: 5, md: 2 }} mb={8} >
                    {content[0].textContent}
                </Typography>
                <Box maxHeight={'100%'}>
                    <img src={band} alt="Relic founders" style={{ maxWidth: '100%' }} />
                </Box>
                <Typography textAlign={'left'} color="secondary" variant="body1" fontWeight={600} fontSize={{ xs: '1.4em', md: '1.3em' }} mx={{ xs: 2, sm: 5, md: 2 }} mb={8} mt={8} >
                    {content[1].textContent}
                </Typography>
            </Container>
        </Box>
    );
};

export default Mission;