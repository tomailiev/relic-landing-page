import { Container, Typography } from "@mui/material";
import logo from "../imgs/WA0002.jpg";
import '@fontsource/tangerine/700.css';

const Title = () => {
    return (
        <Container maxWidth="sm" sx={{ textAlign: "center", m: 8 }}>
            <Typography fontFamily="tangerine" variant="h1">
                Relic Ensemble
            </Typography>
            <img src={logo} width={200} height={"auto"} alt="logo" />
        </Container>
    )
};

export default Title;