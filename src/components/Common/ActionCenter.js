import { Button, Divider, Grid, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { useContext } from "react";
import DialogContext from "../../context/DialogContext";
import TextContext from "../../context/TextContext";
import SubscribeForm from "./SubscribeForm";
// import { analyze } from "../../utils/firebase/firestore-funcs";

const ActionCenter = () => {

    const { setDialog } = useContext(DialogContext);
    const { text } = useContext(TextContext);

    return (
        <>
            <Divider />
            <Container maxWidth={'md'} sx={{ py: 4, my: 5, }}>
                <Typography variant="h5" textAlign={'center'}>
                    {text.actionCenterTitle}
                </Typography>
                <Grid container my={6}>
                    <Grid item md={6} xs={12} textAlign="center" my={2}>
                        <Button variant="contained" size="large" onClick={() => setDialog({type: 'donation', title: 'support relic'})}>Donate</Button>
                        <Typography variant="body1" mt={3}>
                            {text.actionCenterDonate}
                        </Typography>
                    </Grid>
                    <Grid item md={6} xs={12} textAlign="center" my={2}>
                        <Button variant="contained" size="large" onClick={() => setDialog({ type: 'subscription', component: <SubscribeForm /> })}>Subscribe</Button>
                        <Typography variant="body1" mt={3}>
                            {text.actionCenterSubscribe}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default ActionCenter;