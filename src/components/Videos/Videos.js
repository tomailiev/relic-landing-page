import { useContext, useEffect, useState } from "react";
import { checkVideoAccess, downloadDocsV2 } from "../../utils/firebase/firestore-funcs";
import { Box, Button, ButtonGroup, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import VideoItem from "./VideoItem";
import { donorEmailSchema } from "../../utils/yup/schemas";
import { Link, useLocation } from "react-router-dom";
import LoadingContext from "../../context/LoadingContext";
import DialogContext from "../../context/DialogContext";
import DonateForm from "../Common/DonateForm";
import VideoItemSkeleton from "./VideoItemSkeleton";

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
        <Container maxWidth="lg" sx={{ my: 5, textAlign: 'center' }}>
            <Typography variant="h3" my={8}>
                Videos
            </Typography>
            <Container disableGutters sx={{ textAlign: 'left' }}>
                <FormControl fullWidth>
                    <InputLabel id="video-category-select">Category</InputLabel>
                    <Select
                        labelId="video-category-select"
                        id="video-category"
                        value={videoCategory}
                        label="Category"
                        onChange={handleSelectChange}
                        MenuProps={{
                            MenuListProps: {
                                sx: {
                                    background: '#ffffff'
                                }
                            }
                        }}
                    >
                        <MenuItem value={'live'}>Live recording</MenuItem>
                        <MenuItem value={'studio'}>Studio recording</MenuItem>
                        <MenuItem value={'full concert'}>Full concert</MenuItem>
                    </Select>
                </FormControl>
            </Container>
            {videoCategory === 'full concert' && <Box my={3} >
                <Typography variant="body1">Full concert videos are only available for our donors of the <Link to={'/support/tiers'}>Hermes tier</Link> and above. Please enter your email below for access.</Typography>
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
                        sx={{
                            height: '40px',
                            '& fieldset': {
                                border: '2px solid #06303e',
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                borderRight: 'none', // remove double border between input & button
                            },
                        }}
                    />
                    <Button
                        variant={'contained'}
                        type="submit"
                        disabled={loading}
                        sx={{
                            height: '40px',
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            whiteSpace: 'nowrap',
                        }}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>}
            {hasCheckedDonorTier && videoCategory === 'full concert' && (hasPassedVerification
                ? <Typography>Thank you for your support! Enjoy our live concert archive!</Typography>
                : <Box textAlign={'center'}>
                    <Typography>Our system indicates you don't have access to this feature at this time. If you would like to enjoy our archive of full live concerts, consider becoming a Hermes tier donor or higher. If you believe there's an error with your access, contact us for assistance.</Typography>
                    <ButtonGroup variant="contained" sx={{ my: 3 }}>
                        <Button sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }} onClick={handleDonateButtonClick}>Donate</Button>
                        <Link to={'/contact'}>
                            <Button sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>Contact</Button>
                        </Link>
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
                : (!hasCheckedDonorTier && videoCategory !== 'full concert') || (hasCheckedDonorTier && videoCategory === 'full concert')
                    ? <Grid container spacing={6} my={3}>{[1, 2, 3].map(i => <VideoItemSkeleton key={i} />)}</Grid>
                    : <Box height={'350px'} />
            }
        </Container>
    );
};

export default Videos;