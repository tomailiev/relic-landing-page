import { Button, Card, CardActions, CardContent, Divider, Link, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import DialogContext from "../../context/DialogContext";
import NotificationContext from "../../context/NotificationContext";
import TextContext from "../../context/TextContext";
import { links } from "../../data/links";
import SubscribeForm from "../Common/SubscribeForm";

const Support = () => {

    const { setDialog } = useContext(DialogContext);
    const { text } = useContext(TextContext);
    const { setNotification } = useContext(NotificationContext);


    function handleTextCopy() {
        navigator.clipboard.writeText(text.supportGemsAddress?.replaceAll('\\n', '\n'))
            .then(() => {
                setNotification({ type: 'success', message: 'Address copied to clipboard' });
            })
            .catch(_e => {
                setNotification({type: 'error', message: 'Something went wrong. Please try again'})
            })
    }

    return (
        <>
            <Typography variant="h3" textAlign={'center'} mt={6} mb={10}>
                Support Us
            </Typography>
            <Box mt={2} mb={5}>
                <Container maxWidth={'md'}>
                    <Typography variant="h5" textAlign={'left'} my={2}>
                        CIRCLE OF SUPPORTERS
                    </Typography>
                    <Typography variant="h6">
                        Donate now
                    </Typography>
                    <Typography mb={3}>
                        In order to sustain our mission and the ability to bring early music to communities across the continent, Relic relies on the generous support of our donors. All contributions are tax-deductible through our fiscal sponsorship status with GEMS (Gotham Early Music Scene, Inc) and donations of any size are greatly appreciated! Consider joining our Circle of Supporters and make a tax-deductible contribution today:
                    </Typography>
                    <Button variant="contained" size="large" href={links.gems} target={'_blank'} >Donate</Button>
                    <Typography variant="body2" fontStyle={'italic'} mt={3} mb={5}>
                        Note: Upon clicking the above link, you will be redirected to our fiscal sponsor's donation platform. From there you will have the option of selecting your donation amount as well as the option of making a one-time or automatically renewable donation to Relic. All donations are tax-deductible.
                    </Typography>
                    <Typography variant="h6">
                        Donate via check
                    </Typography>
                    <Typography mb={2}>
                        Make checks payable to “GEMS”, specify "RELIC" in the memo, and mail to:
                    </Typography>
                    <Card variant="outlined" sx={{ width: '250px' }}>
                        <CardContent>
                            <Typography whiteSpace={'pre'}>
                                {text.supportGemsAddress?.replaceAll('\\n', '\n')}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="outlined" onClick={handleTextCopy}>Copy</Button>
                        </CardActions>
                    </Card>
                    <Typography variant="h6" mt={3}>
                        Matching gifts
                    </Typography>
                    <Typography pb={3}>
                        Double your gift by inquiring if your company will match your contribution to Relic. For help and more information about this, please contact Aniela Eddy at relicensemble@gmail.com.
                    </Typography>
                    <Typography variant="h6" mt={3}>
                        OTHER FORMS OF GIVING
                    </Typography>
                    <Typography pb={3}>
                        For corporate sponsorship, foundation and government funding, planned giving and legacy gifts, please contact Aniela Eddy at relicensemble@gmail.com for more information.
                    </Typography>
                </Container>
            </Box>
            <Divider />
            <Box mt={2} my={10} textAlign="left">
                <Container maxWidth={'md'}>
                    <Typography variant="h5" my={2}>
                        JOIN THE RELIC FAMILY TODAY!
                    </Typography>
                    <Typography variant="h6">
                        Don't Miss A Beat
                    </Typography>
                    <Typography pb={3}>
                        <Link onClick={() => setDialog({ type: 'subscription', component: <SubscribeForm /> })}>Join our mailing list</Link> to receive the most up-to-date Relic-related news! Follow us on social media (<Link href={links.insta} target={"_blank"}>Instagram</Link>/<Link href={links.facebook} target={'_blank'}>Facebook</Link>) for fun anecdotes and subscribe to our <Link href={links.youtube} target={'_blank'}>YouTube channel</Link> to listen to us wherever you go.
                    </Typography>
                </Container>
                <Container maxWidth={'md'}>
                    <Typography variant="h6">
                        Volunteers
                    </Typography>
                    <Typography>
                        Relic is seeking volunteers, on an ongoing basis, to help with a variety of activities. If you possess a special skill and/or have a keen interest in becoming more deeply involved, please <Link component={RouterLink} to={'/contact'}>contact us</Link> for more information.
                    </Typography>
                </Container>
            </Box>
        </>
    );
};

export default Support;