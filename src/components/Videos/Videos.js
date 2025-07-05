import { useEffect, useState } from "react";
import { checkVideoAccess, downloadDocsV2 } from "../../utils/firebase/firestore-funcs";
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import VideoItem from "./VideoItem";
import { donorEmailSchema } from "../../utils/yup/schemas";
import { Link } from "react-router-dom";

const Videos = () => {

    const [videoCategory, setVideoCategory] = useState('live');
    const [videos, setVideos] = useState([]);
    const [userEmail, setUserEmail] = useState('');
    const [valError, setValError] = useState('');
    const [hasPassedVerification, setHasPassedVerification] = useState(false);

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
        setVideoCategory(event.target.value)
    }

    function checkEmailAddress(e) {
        e.preventDefault();
        donorEmailSchema.validate({ email: userEmail })
            .then(val => {
                return checkVideoAccess(val);
            })
            .then(result => {
                if (result.data.code === 'Success') {
                    setHasPassedVerification(true);
                } else {
                    setHasPassedVerification(false);
                }

            })
            .catch(e => {
                setValError(e.message);

            })
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
                    my={2}
                    onSubmit={checkEmailAddress}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%', // optional: full-width
                        maxWidth: 400,
                        position: 'relative',
                        left: '50%',
                        transform: 'translate(-50%)'
                    }}
                >
                    <TextField
                        variant="outlined"
                        placeholder="Email"
                        size="small"
                        fullWidth
                        value={userEmail}
                        error={!!valError}
                        helperText={valError}
                        onFocus={() => setValError('')}
                        onChange={(e) => setUserEmail(e.target.value)}
                        sx={{
                            // borderRight: 'none',
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
            {videos?.length ? <Grid container spacing={6} my={3}>
                {videos.map(video => {
                    return <VideoItem key={video.youtubeId} video={video} />
                })}
            </Grid>
                : <Box height={'200px'} />}
        </Container>
    );
};

export default Videos;