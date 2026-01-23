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

const Videos = () => {

    const { loading, setLoading } = useContext(LoadingContext);
    const { setDialog } = useContext(DialogContext);
    const [videoCategory, setVideoCategory] = useState('');
    const [videos, setVideos] = useState([]);
    const [userEmail, setUserEmail] = useState('');
    const [valError, setValError] = useState('');
    const [hasPassedVerification, setHasPassedVerification] = useState(false);
    const [hasCheckedDonorTier, setHasCheckedDonorTier] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.has('category')) {
            const category = searchParams.get('category');
            if (['clip', 'full concert'].includes(category)) {
                setVideoCategory(category);
            }
        } else {
            setVideoCategory('clip');
        }
    }, [location.search]);

    useEffect(() => {
        if (videoCategory !== 'full concert' || hasPassedVerification) {
            if (videoCategory !== 'clip') return;

            downloadDocsV2('videos', [
                { type: 'condition', value: videoCategory === 'full concert' ? ['category', '==', videoCategory] : ['category', 'in', ['live', 'studio']] },
                { type: 'sorting', value: ['featured', 'desc'] }
            ])
                .then(docs => setVideos(docs))
        } else {
            setVideos([]);
        }
    }, [videoCategory, hasPassedVerification]);

    function handleSelectChange(cat) {
        setVideos([]);
        setVideoCategory(cat)
    }

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
            <Typography variant="h3" my={8} fontWeight={'600'} color={'secondary.main'}>
                Videos
            </Typography>
            <Container maxWidth={'xl'} sx={{ textAlign: 'left', }}>
                <Grid container>
                    <Grid item size={{ xs: 12, md: 3 }} display={'flex'} flexDirection={{ xs: 'row', md: 'column' }} alignItems={'flex-start'} justifyContent={{ xs: 'center', md: 'flex-start' }} mb={{ xs: 5, md: 0 }}>

                        <Button
                            variant="text"
                            onClick={() => handleSelectChange('clip')}
                            disabled={videoCategory === 'clip'}
                            sx={{
                                display: 'block',
                                color: 'secondary.main',
                                textTransform: 'capitalize',
                                textDecoration: 'underline',
                                fontSize: '1.4em',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    color: '#f9e9b3', // light gold shade
                                },
                                '&.Mui-disabled': {
                                    color: '#ccc4c496',
                                    textDecoration: 'none'
                                },
                            }}
                        >
                            Clips
                        </Button>
                        <Button
                            variant="text"
                            onClick={() => handleSelectChange('full concert')}
                            disabled={videoCategory === 'full concert'}
                            sx={{
                                display: 'block',
                                color: 'secondary.main',
                                textTransform: 'capitalize',
                                textDecoration: 'underline',
                                fontSize: '1.4em',

                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    color: '#f9e9b3', // light gold shade
                                },
                                '&.Mui-disabled': {
                                    color: '#ccc4c496',
                                    textDecoration: 'none'

                                },
                            }}
                        >
                            Full Concerts
                        </Button>

                    </Grid>
                    <Grid item size={{ xs: 12, md: 9 }}>

                        {videoCategory === 'full concert' && <Box mb={3} >
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
                        {hasCheckedDonorTier && videoCategory === 'full concert' && (hasPassedVerification
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
                            : (!hasCheckedDonorTier && videoCategory !== 'full concert') || (hasCheckedDonorTier && hasPassedVerification && videoCategory === 'full concert')
                                ? <Grid container spacing={6} mb={3}>{[1, 2, 3, 4, 5, 6].map(i => <VideoItemSkeleton playIcon={true} key={i} />)}</Grid>
                                : <Box height={'350px'} />
                        }
                    </Grid>
                </Grid>

            </Container>
        </Box>
    );
};

export default Videos;