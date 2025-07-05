import { useEffect, useState } from "react";
import { downloadDocsV2 } from "../../utils/firebase/firestore-funcs";
import { Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import VideoItem from "./VideoItem";

const Videos = () => {

    const [videoCategory, setVideoCategory] = useState('live');
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        downloadDocsV2('videos', [
            { type: 'condition', value: ['category', '==', videoCategory] },
            { type: 'sorting', value: ['featured', 'desc'] }
        ])
            .then(docs => setVideos(docs))
    }, [videoCategory]);

    function handleSelectChange(event) {
        setVideoCategory(event.target.value)
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
            {videos?.length && <Grid container spacing={6} my={3}>
                {videos.map(video => {
                    return <VideoItem video={video} />
                })}
            </Grid>}
        </Container>
    );
};

export default Videos;