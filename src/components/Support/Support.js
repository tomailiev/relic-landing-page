import { Button, Link, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import { links } from "../../data/links";

const Support = () => {

    return (
        <>
            <Typography variant="h3" textAlign={'center'} mt={6} mb={10}>
                Support Us
            </Typography>
            <Box mt={2} mb={5} textAlign="center">
                <Container maxWidth={'md'}>
                    <Typography variant="h5" textAlign={'left'} my={2}>
                        Relic needs your help!
                    </Typography>
                    <Typography textAlign={'left'} my={3}>
                        If you like our mission of bringing quality live music to communities across the country, please consider making a <span style={{ fontWeight: 'bold' }}>tax-deductible contribution!</span> Government funding for the arts is limited and extremely difficult to obtain, especially for small organizations like ours. The only way we are able to achieve our mission is through your continued support. If you believe that our music should reach more communities, click on the button below and join our network of supporters!
                    </Typography>
                    <Button variant="contained" size="large" href={links.gems} target={'_blank'} >Donate</Button>
                    <Typography fontStyle={'italic'} mt={3} mb={5}>
                        Upon clicking the button above you will be redirected to our fiscal sponsor <Link>Gotham Early Music Scene, Inc.</Link>'s donation form page, where you can select your donation's amount and frequency! For more options, like donating offline or help with your donation, please do not hesitate to <Link component={RouterLink} to={'/contact'}>Contact us</Link>!
                    </Typography>
                </Container>
            </Box>
        </>
    );
};

export default Support;