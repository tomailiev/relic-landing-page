import { Button, Divider, Grid, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { useContext } from "react";
import DialogContext from "../../context/DialogContext";
import { links } from '../../data/links';

const ActionCenter = () => {

    const { setDialog } = useContext(DialogContext);

    return (
        <>
            <Divider />
            <Container maxWidth={'md'} sx={{ py: 4, my: 5, }}>
                <Typography variant="h5" textAlign={'center'}>
                    Become our friend!
                </Typography>
                <Grid container my={6}>
                    <Grid item md={6} xs={12} textAlign="center" my={2}>
                        <Button variant="contained" size="large" href={links.gems} target={'_blank'}>Donate</Button>
                        <Typography variant="body1" mt={3}>
                            Help us bring our music to communities accross the United States!
                        </Typography>
                    </Grid>
                    <Grid item md={6} xs={12} textAlign="center" my={2}>
                        <Button variant="contained" size="large" onClick={() => setDialog('subscription')}>Subscribe</Button>
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