import { Container, Typography } from "@mui/material";
import logo from "../imgs/photo.jpg";

const Title = () => {
    return (
        <Container maxWidth="xs" sx={{textAlign: "center", m: 2}}>
        <Typography variant="h3">
            Relic
        </Typography>
        <img src={logo} width={300} height={"auto"} alt="logo" />
        </Container>
    )
};

export default Title;