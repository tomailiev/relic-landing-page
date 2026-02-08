import { useContext, useEffect, useState } from "react";
import { checkVideoAccess, downloadDocsV2 } from "../../utils/firebase/firestore-funcs";
import { Box, Button, ButtonGroup, Container, Grid, Link, TextField, Typography } from "@mui/material";
import VideoItem from "./VideoItem";
import { donorEmailSchema } from "../../utils/yup/schemas";
import { Link as RouterLink, useLocation } from "react-router-dom";
import LoadingContext from "../../context/LoadingContext";
import DialogContext from "../../context/DialogContext";
import DonateForm from "../Common/DonateForm";
import VideoItemSkeleton from "./VideoItemSkeleton";
import { bgs } from "../../data/images";
import { links } from "../../data/links";
import { SubscriptionsOutlined } from "@mui/icons-material";
import Seo from "../Common/SEO";

const Videos = () => {

    const { loading, setLoading } = useContext(LoadingContext);
    const { setDialog } = useContext(DialogContext);
    const [videos, setVideos] = useState([]);
    const [userEmail, setUserEmail] = useState('');
    const [valError, setValError] = useState('');
    const [hasPassedVerification, setHasPassedVerification] = useState(false);
    const [hasCheckedDonorTier, setHasCheckedDonorTier] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/media/videos') {
            downloadDocsV2('videos', [
                { type: 'condition', value: ['category', 'in', ['live', 'studio']] },
                { type: 'sorting', value: ['featured', 'desc'] }
            ])
                .then(docs => setVideos(docs))
        }
        else if (location.pathname === '/media/concerts' && hasPassedVerification) {

            downloadDocsV2('videos', [
                { type: 'condition', value: ['category', '==', 'full concert'] },
                { type: 'sorting', value: ['featured', 'desc'] }
            ])
                .then(docs => setVideos(docs))
        } else {
            setVideos([]);
        }
    }, [hasPassedVerification, location.pathname]);


    function checkEmailAddress(e) {
        e.preventDefault();
        donorEmailSchema.validate({ email: userEmail })
            .then(val => {
                setLoading(true);
                return checkVideoAccess(val);
            })
            .then(result => {
                setLoading(false);
                setHasCheckedDonorTier(true);
                if (result.data.code === 'Success') {
                    setHasPassedVerification(true);
                } else {
                    setHasPassedVerification(false);
                }

            })
            .catch(e => {
                setLoading(false);
                setValError(e.message);

            });
    }

    function handleDonateButtonClick() {
        setLoading(true);
        setDialog({ type: 'donation', title: 'support relic', component: <DonateForm /> })
    }

    return (
        <Box textAlign={'center'} sx={{ background: `center / cover url(${bgs.generalBg}) repeat-y`, py: 2, minHeight: '100vh' }}>
            <Seo title={location.pathname === '/media/videos' ? 'Videos' : 'Full Concert Videos'} description={location.pathname === '/media/videos' ? 'Recent video releases. Subscribe to Relic on YouTube.' : 'Full concert archive, available to yearly donors above $1000'} />
            <Typography variant="h3" my={8} fontWeight={'600'} color={'secondary.main'}>
                {location.pathname === '/media/concerts' ? 'Full Concerts' : 'Videos'}
            </Typography>
            {location.pathname === '/media/videos' && <Button variant="contained" sx={{ background: '#f60000', '&:hover': { background: '#a90000' }, mb: 5 }} endIcon={<SubscriptionsOutlined />} href={links.ytSubscribe} target="_blank">
                {'Subscribe'}
            </Button>}
            <Container maxWidth={'lg'} sx={{ textAlign: 'left', }}>

                {location.pathname === '/media/concerts' && <Box mb={3} >
                    <Typography variant="body1" fontSize={'1.4em'} color={'secondary.main'} fontWeight={'bold'}>Full concert videos are only available for our donors within our <Link component={RouterLink} color="secondary.main" style={{ '&:visited': { color: 'secondary.main' } }} to={'/support/tiers'}>Hermes circle</Link> ($1000+ annualy) and above. To learn more about supporting Relic and our sustained giving program <Link component={RouterLink} color="secondary.main" style={{ '&:visited': { color: 'secondary.main' } }} to={'/support/donate'}>click here</Link>.</Typography>
                    <br />
                    <Typography variant="body1" fontSize={'1.4em'} color={'secondary.main'}>If you are a member of the Hermes circle or above, enter your email below to access our full concert videos.</Typography>
                    <Box
                        component="form"
                        my={3}
                        onSubmit={checkEmailAddress}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            maxWidth: 400,
                            position: 'relative',
                            justifyContent: 'flex-start'
                        }}
                    >
                        <TextField
                            variant="outlined"
                            label="Email"
                            size="small"
                            fullWidth
                            value={userEmail}
                            error={!!valError}
                            helperText={valError}
                            onFocus={() => setValError('')}
                            onChange={(e) => setUserEmail(e.target.value)}
                            InputProps={{
                                sx: {
                                    backgroundColor: '#ffffff',
                                }
                            }}
                            InputLabelProps={{
                                sx: {
                                    // color: 'secondary.main',
                                    backgroundColor: '#ffffff',
                                    borderRadius: 3,
                                    px: 0.5,
                                }
                            }}
                            sx={{
                                '& fieldset': {
                                    border: '2px solid',
                                    borderColor: 'secondary.main',
                                    borderTopRightRadius: 0,
                                    borderBottomRightRadius: 0,
                                    borderRight: 'none',
                                },
                            }}
                        />
                        <Button
                            variant={'outlined'}
                            type="submit"
                            disabled={loading}
                            sx={{
                                height: '40px',
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                                whiteSpace: 'nowrap',
                                color: 'secondary.main',
                                borderColor: 'secondary.main',
                                borderWidth: '2px',
                                '&:hover': {
                                    backgroundColor: 'secondary.main',
                                    color: 'secondary.contrastText',
                                    borderColor: 'secondary.main',
                                    borderWidth: '2px'
                                },
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>}
                {hasCheckedDonorTier && location.pathname === '/media/concerts' && (hasPassedVerification
                    ? <Typography color={'secondary.main'} fontSize={'1.4em'} mb={3}>Thank you for your support! Enjoy our live concert archive!</Typography>
                    : <Box>
                        <Typography color={'secondary.main'} fontSize={'1.4em'}>Our system indicates you don't have access to this feature at this time. If you would like to enjoy our archive of full live concerts, consider becoming a Hermes circle donor or higher. If you believe there's an error with your access, contact us for assistance.</Typography>
                        <ButtonGroup variant="outlined" sx={{ my: 3, }}>
                            <Button sx={{
                                borderTopRightRadius: 0, borderBottomRightRadius: 0, color: 'secondary.main',
                                borderColor: 'secondary.main',
                                '&:hover': {
                                    backgroundColor: 'secondary.main',
                                    color: 'secondary.contrastText',
                                    borderColor: 'secondary.main',
                                },
                            }} onClick={handleDonateButtonClick}>Donate</Button>
                            <RouterLink to={'/contact'}>
                                <Button sx={{
                                    borderTopLeftRadius: 0, borderBottomLeftRadius: 0, color: 'secondary.main',
                                    borderColor: 'secondary.main',
                                    '&:hover': {
                                        backgroundColor: 'secondary.main',
                                        color: 'secondary.contrastText',
                                        borderColor: 'secondary.main',
                                    },
                                }}>Contact</Button>
                            </RouterLink>
                        </ButtonGroup>
                    </Box>
                )
                }
                {videos?.length
                    ? <Grid container spacing={6} mb={3}>
                        {videos.map(video => {
                            return <VideoItem key={video.youtubeId} video={video} />
                        })}
                    </Grid>
                    : (!hasCheckedDonorTier && location.pathname !== '/media/concerts') || (hasCheckedDonorTier && hasPassedVerification && location.pathname === '/media/concerts')
                        ? <Grid container spacing={6} mb={3}>{[1, 2, 3, 4, 5, 6].map(i => <VideoItemSkeleton playIcon={true} key={i} />)}</Grid>
                        : <Box height={'350px'} />
                }

            </Container>
        </Box>
    );
};

export default Videos;