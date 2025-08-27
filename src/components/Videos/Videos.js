import { useContext, useEffect, useState } from "react";
import { checkVideoAccess, downloadDocsV2 } from "../../utils/firebase/firestore-funcs";
import { Box, Button, ButtonGroup, Container, FormControl, Grid, InputLabel, Link, MenuItem, Select, TextField, Typography } from "@mui/material";
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
            if (['live', 'studio', 'full concert'].includes(category)) {
                setVideoCategory(category);
            }
        } else {
            setVideoCategory('live');
        }
    }, [location.search]);

    useEffect(() => {
        if (videoCategory !== 'full concert' || hasPassedVerification) {
            downloadDocsV2('videos', [
                { type: 'condition', value: ['category', '==', videoCategory] },
                { type: 'sorting', value: ['featured', 'desc'] }
            ])
                .then(docs => setVideos(docs))
        } else {
            setVideos([]);
        }
    }, [videoCategory, hasPassedVerification]);

    function handleSelectChange(event) {
        setVideos([]);
        setVideoCategory(event.target.value)
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
        <Box textAlign={'center'} sx={{ background: `center / cover url(${bgs.generalBg}) repeat-y`, py: 2 }}>
            <Typography variant="h3" my={8} fontWeight={'600'} color={'secondary.main'}>
                Videos
            </Typography>
            <Container maxWidth={'lg'} sx={{ textAlign: 'left', }}>
                <FormControl fullWidth>
                    <InputLabel
                        id="video-category-select"
                        sx={{
                            // color: 'secondary.main',
                            backgroundColor: '#ffffff',
                            px: 0.5, // small padding so the background extends beyond text
                            borderRadius: 3
                        }}
                    >
                        Category
                    </InputLabel>
                    <Select
                        labelId="video-category-select"
                        id="video-category"
                        value={videoCategory}
                        onChange={handleSelectChange}
                        sx={{ background: '#ffffff' }}
                        MenuProps={{
                            MenuListProps: {
                                sx: { background: '#ffffff' }
                            }
                        }}
                    >
                        <MenuItem value="live">Live recording</MenuItem>
                        <MenuItem value="studio">Studio recording</MenuItem>
                        <MenuItem value="full concert">Full concert</MenuItem>
                    </Select>
                </FormControl>

                {videoCategory === 'full concert' && <Box my={3} >
                    <Typography variant="body1" fontSize={'1.4em'} color={'secondary.main'}>Full concert videos are only available for our <Link component={RouterLink} color="secondary.main" style={{ '&:visited': { color: 'secondary.main' } }} to={'/support/tiers'}>Hermes circle</Link> donors and higher. Please enter your email below for access.</Typography>
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
                            left: '50%',
                            transform: 'translate(-50%)'
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
                    ? <Typography color={'secondary.main'} fontSize={'1.4em'} textAlign={'center'}>Thank you for your support! Enjoy our live concert archive!</Typography>
                    : <Box textAlign={'center'}>
                        <Typography color={'secondary.main'} fontSize={'1.4em'}>Our system indicates you don't have access to this feature at this time. If you would like to enjoy our archive of full live concerts, consider becoming a Hermes tier donor or higher. If you believe there's an error with your access, contact us for assistance.</Typography>
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
                    ? <Grid container spacing={6} my={3}>
                        {videos.map(video => {
                            return <VideoItem key={video.youtubeId} video={video} />
                        })}
                    </Grid>
                    : (!hasCheckedDonorTier && videoCategory !== 'full concert') || (hasCheckedDonorTier && hasPassedVerification && videoCategory === 'full concert')
                        ? <Grid container spacing={6} my={3}>{[1, 2, 3, 4, 5, 6].map(i => <VideoItemSkeleton playIcon={true} key={i} />)}</Grid>
                        : <Box height={'350px'} />
                }
            </Container>
        </Box>
    );
};

export default Videos;