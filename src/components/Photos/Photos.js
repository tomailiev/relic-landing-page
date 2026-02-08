import { Box, Container, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import PhotoItem from "./PhotoItem";
import { downloadDocsV2 } from "../../utils/firebase/firestore-funcs";
import VideoItemSkeleton from "../Videos/VideoItemSkeleton";
import DialogContext from "../../context/DialogContext";
import PhotoCarousel from "./PhotoCarousel";
import { bgs } from "../../data/images";
import Seo from "../Common/SEO";

const Photos = () => {

    const { setDialog } = useContext(DialogContext);

    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        downloadDocsV2('photos', [
            { type: 'sorting', value: ['title', 'asc'] }
        ])
            .then(docs => setPhotos(docs))
    }, []);

    function setPhotoDialog(index, photo) {
        const component = <PhotoCarousel photos={photos} currentIndex={index} />;
        setDialog({ type: 'photo', title: 'Gallery', component })

    }

    return (
        <Box sx={{background: `center / cover url(${bgs.generalBg}) repeat-y`, py: 2}}>
            <Seo title={'Photos'} description={'Photos from recent performances'} />
            <Container maxWidth="lg" sx={{textAlign: 'center' }}>
                <Typography variant="h3" my={8} fontWeight={'600'} color={'secondary.main'}>
                    Photos
                </Typography>
                {photos?.length
                    ? <Grid container spacing={6} mb={3} alignItems="stretch">
                        {photos.map((photo, index) => {
                            return <PhotoItem key={photo.id} photo={photo} setPhotoDialog={() => setPhotoDialog(index, photo)} />
                        })}
                    </Grid>
                    : <Grid container spacing={6} my={3}>{[1, 2, 3, 4, 5, 6].map(i => <VideoItemSkeleton key={i} />)}</Grid>
                }
            </Container>
        </Box>

    );
};

export default Photos;