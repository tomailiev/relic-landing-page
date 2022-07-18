import { Container, Typography } from "@mui/material";
import logo from "../../assets/logos/relic-logo-red-256.png";

const Title = () => {
    return (
        <Container maxWidth="md" sx={{ textAlign: "center", mt: 2 }}>
            <img src={logo} alt="logo" style={{height: '45%'}} />
            <Typography variant="h3" color={'#bd6984'} my={'25px'}>
                PRESENTS
            </Typography>
            <Typography maxWidth={'100%'} variant="h1" my={'85px'} mx={1} color={'white'} bgcolor={'rgba(179, 87, 126, 0.5)'} sx={{textShadow:"-2px 0px 3px rgba(150, 150, 150, 1)"}}>
                AUTUMN RISING
            </Typography>
        </Container>
    )
};

export default Title;