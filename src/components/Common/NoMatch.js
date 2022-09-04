import { Typography } from "@mui/material";
import { Container } from "@mui/system";

const NoMatch = () => {

    return (
        <Container sx={{ height: '450px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h5" textAlign={'center'}>
                Uh oh... No content at this address.
            </Typography>
        </Container>
    );
};

export default NoMatch;