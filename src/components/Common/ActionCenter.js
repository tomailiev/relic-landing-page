import { Button, Grid, Paper, Typography, Box } from "@mui/material"
// import { Box } from "@mui/system"
import { useContext } from "react";
import DialogContext from "../../context/DialogContext";
import TextContext from "../../context/TextContext";
import SubscribeForm from "./SubscribeForm";
import LoadingContext from "../../context/LoadingContext";
import { analyze } from "../../utils/firebase/firestore-funcs";
import DonateForm from "./DonateForm";

const ActionCenter = () => {

    const { setDialog } = useContext(DialogContext);
    const { text } = useContext(TextContext);
    const { setLoading } = useContext(LoadingContext);

    function handleDonateButtonClick() {
        analyze('select_content', { content_type: 'donate_button' });
        setLoading(true);
        setDialog({ type: 'donation', title: 'support relic', component: <DonateForm /> })
    }

    return (
        <>
            {/* <Divider /> */}
            <Box sx={{ pt: 4, }}>
                <Typography variant="h6" textAlign={'center'} fontWeight={600} fontSize={'1.6em'} sx={{ mb: 2 }}>
                    {text.actionCenterTitle}
                </Typography>
                <Grid container>
                    <Grid item md={6} xs={12} textAlign="center" height={'300px'}>
                        <Paper onClick={handleDonateButtonClick} elevation={0} sx={{
                            transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s',
                            position: 'relative',
                            overflow: 'hidden',
                            height: '100%',
                            cursor: 'pointer',
                            background: 'transparent',
                            width: '100%',
                            display: 'flex',
                            borderRadius: 0,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            borderRight: { xs: 'none', md: '1px solid #244458' },
                            borderBottom: { xs: '1px solid #244458', md: 'none' },
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: 4,
                                // backgroundColor: '#ffffff'
                            }
                        }} >
                            <Button variant="contained" sx={{ textUnderlineOffset: '6px', fontFamily: 'Cochin', fontSize: '1.2em', mx: { xs: 8, sm: 12 } }}>Donate</Button>
                            <Typography variant="subtitle1" mt={3}>
                                {text.actionCenterDonate}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item md={6} xs={12} textAlign="center" height={'300px'}>
                        <Paper onClick={() => setDialog({ type: 'subscription', component: <SubscribeForm /> })} elevation={0} sx={{
                            transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s',
                            position: 'relative',
                            overflow: 'hidden',
                            height: '100%',
                            cursor: 'pointer',
                            background: 'transparent',
                            width: '100%',
                            display: 'flex',
                            borderRadius: 0,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: 4,
                                // backgroundColor: '#ffffff'
                            }
                        }} >
                            <Button variant="contained" sx={{ textUnderlineOffset: '6px', fontFamily: 'Cochin', fontSize: '1.2em', mx: { xs: 8, sm: 12 } }}>Subscribe</Button>
                            <Typography variant="subtitle1" mt={3}>
                                {text.actionCenterSubscribe}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default ActionCenter;