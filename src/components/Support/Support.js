import { Button, Card, CardActions, CardContent, Divider, Link, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import DialogContext from "../../context/DialogContext";
import NotificationContext from "../../context/NotificationContext";
import TextContext from "../../context/TextContext";
import { links } from "../../data/links";
import SubscribeForm from "../Common/SubscribeForm";
import TypographyCombo from "./TypographyCombo";
import { analyze } from "../../utils/firebase/firestore-funcs";


const Support = () => {

    const { setDialog } = useContext(DialogContext);
    const { text } = useContext(TextContext);
    const { setNotification } = useContext(NotificationContext);
    const [copyButton, setCopyButton] = useState('Copy');

    const joinText = <><Link onClick={() => setDialog({ type: 'subscription', component: <SubscribeForm /> })}>Join our mailing list</Link> to receive the most up-to-date Relic-related news! Follow us on social media (<Link href={links.insta} target={"_blank"}>Instagram</Link>/<Link href={links.facebook} target={'_blank'}>Facebook</Link>) for fun anecdotes and subscribe to our <Link href={links.youtube} target={'_blank'}>YouTube channel</Link> to listen to us wherever you go.</>;

    const volunteerText = <>Relic is seeking volunteers, on an ongoing basis, to help with a variety of activities. If you possess a special skill and/or have a keen interest in becoming more deeply involved, please <Link component={RouterLink} to={'/contact'}>contact us</Link> for more information.</>;


    function handleTextCopy() {
        navigator.clipboard.writeText(text.supportGemsAddress?.replaceAll('\\n', '\n'))
            .then(() => {
                setCopyButton('Copied!');
                setNotification({ type: 'success', message: 'Address copied to clipboard' });
            })
            .catch(_e => {
                setNotification({ type: 'error', message: 'Something went wrong. Please try again' });
            })
    }

    return (
        <>
            <Typography variant="h3" textAlign={'center'} mt={6} mb={10}>
                Support Relic
            </Typography>
            <Box mt={2} mb={5}>
                <Container maxWidth={'md'}>
                    <Typography variant="h5" textAlign={'left'} my={2} textTransform={'uppercase'}>
                        {text.supportSectionDonateTitle}
                    </Typography>
                    <TypographyCombo title={text.supportDonateNowTitle} text={text.supportDonateNowText} />
                    <Button variant="contained" size="large" href={links.gems} target={'_blank'} onClick={() => analyze('select_content', {content_type: 'donate_button'})}>Donate</Button>
                    <Typography variant="body2" fontStyle={'italic'} mt={3} mb={5}>
                        {text.supportDonateNowNote}
                    </Typography>
                    <TypographyCombo title={text.supportDonateCheckTitle} text={text.supportDonateCheckText} />
                    <Card variant="outlined" sx={{ width: '250px', mb: 3 }}>
                        <CardContent>
                            <Typography whiteSpace={'pre'}>
                                {text.supportGemsAddress?.replaceAll('\\n', '\n')}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="outlined" onClick={handleTextCopy}>{copyButton}</Button>
                        </CardActions>
                    </Card>
                    <TypographyCombo title={text.supportMatchingTitle} text={text.supportMatchingText} />
                    <TypographyCombo title={text.supportOtherTitle} text={text.supportOtherText} />
                </Container>
            </Box>
            <Divider />
            <Box mt={2} my={10} textAlign="left">
                <Container maxWidth={'md'}>
                    <Typography variant="h5" my={2} textTransform={'uppercase'}>
                        {text.supportSectionJoinTitle}
                    </Typography>
                    <TypographyCombo title={text.supportJoinTitle} text={joinText} />
                </Container>
                <Container maxWidth={'md'}>
                    <TypographyCombo title={text.supportVolunteersTitle} text={volunteerText} />
                </Container>
            </Box>
        </>
    );
};

export default Support;