import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import logo from "../../assets/logos/relic-logo-red-256.png";
import TextContext from "../../context/TextContext";

const Title = () => {

    const { text } = useContext(TextContext);

    return (
        <Container maxWidth={false} disableGutters sx={{ textAlign: "center", mt: 2, height: '100%' }}>
            <Box height={'50%'} display="flex" justifyContent={"center"} alignItems="center">
                <img src={logo} alt="logo" width={'auto'} height={'85%'} />
            </Box>
            {/* <Typography variant="h3" color={'#bd6984'} my={'25px'}>
                    PRESENTS
                </Typography> */}
            <Box height={'50%'} display="flex" flexDirection={'column'} justifyContent="center" mt={1}>
                <Typography maxWidth={'100%'} variant="h1" mt={'85px'} mx={1} color={'white'} bgcolor={'rgba(179, 87, 126, 0.7)'} sx={{ textShadow: "-2px 0px 3px rgba(150, 150, 150, 1)" }}>
                    {text.siteHeading || 'RELIC'}
                </Typography>
                <Typography variant="subtitle1">
                    {text.siteSubtitle || 'The period chamber orchestra dedicated to bringing early music to all 50 states'}
                </Typography>
            </Box>
        </Container>
    )
};

export default Title;