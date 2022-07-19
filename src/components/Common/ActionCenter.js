import { Button, Divider, Grid, Typography } from "@mui/material"
import { Container } from "@mui/system"

const ActionCenter = () => {
    return (
        <>
            <Divider />
            <Container maxWidth={'md'} sx={{ py: 4, my: 5 }}>
                <Typography variant="h5" textAlign={'center'}>
                    Become a friend of Relic
                </Typography>
                <Grid container my={6}>
                    <Grid item md={6} textAlign="center">
                        <Button variant="contained" size="large">Donate</Button>
                        <Typography variant="body1" mt={3}>
                            Help us bring our music to communities accross the United States!
                        </Typography>
                    </Grid>
                    <Grid item md={6} textAlign="center">
                        <Button variant="contained" size="large" >Subscribe</Button>
                        <Typography variant="body1" mt={3}>
                            Get updates on our journey in your inbox!
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default ActionCenter;