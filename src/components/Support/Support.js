import { Button, Card, CardActions, CardContent, Link, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import DialogContext from "../../context/DialogContext";
import NotificationContext from "../../context/NotificationContext";
import TextContext from "../../context/TextContext";
import { links } from "../../data/links";
import SubscribeForm from "../Common/SubscribeForm";
import TypographyCombo from "./TypographyCombo";
// import { analyze } from "../../utils/firebase/firestore-funcs";


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
            <Typography variant="h3" textAlign={'center'} mt={8} mb={10}>
                Support Relic
            </Typography>
            <Box mt={2} mb={5}>
                <Container maxWidth={'lg'}>
                    <TypographyCombo title={text.supportDonateNowTitle} text={text.supportDonateNowText} />
                    <Card variant="outlined" sx={{ mb: 3 }}>
                        <iframe title="donation-frame" className="iframe-class" src={links.gems} width="100%" height={'603px'} frameBorder="0" scrolling="auto" marginHeight="0" marginWidth="0" allowtransparency="true" ></iframe>
                    </Card>
                    <Typography variant="body2" fontStyle={'italic'} mb={5}>
                        Form not loading? <Link href={links.gems} target="_blank" referrerPolicy="no-referrer">Click here</Link>
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
                    <TypographyCombo title={text.supportMatchingTitle} text={text.supportMatchingText.replaceAll('Aniela Eddy at aniela@relicensemble.org', `${text.contactDevName} at ${text.contactDevEmail}`)} />
                    <TypographyCombo title={text.supportOtherTitle} text={text.supportOtherText.replaceAll('Aniela Eddy at aniela@relicensemble.org', `${text.contactDevName} at ${text.contactDevEmail}`)} />
                </Container>
                <Container maxWidth={'lg'}>
                    <TypographyCombo title={text.supportJoinTitle} text={joinText} />
                    <TypographyCombo title={text.supportVolunteersTitle} text={volunteerText} />
                </Container>
            </Box>
        </>
    );
};

export default Support;