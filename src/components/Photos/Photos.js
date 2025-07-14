import { Container, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import PhotoItem from "./PhotoItem";
import { downloadDocsV2 } from "../../utils/firebase/firestore-funcs";
import VideoItemSkeleton from "../Videos/VideoItemSkeleton";
import DialogContext from "../../context/DialogContext";
import PhotoCarousel from "./PhotoCarousel";

const Photos = () => {

    const { setDialog } = useContext(DialogContext);

    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        downloadDocsV2('photos', [
            { type: 'sorting', value: ['createdAt', 'desc'] }
        ])
            .then(docs => setPhotos(docs))
    }, []);

    function setPhotoDialog(index, photo) {
        const component = <PhotoCarousel photos={photos} currentIndex={index} />;
        setDialog({ type: 'photo', title: 'Gallery', component })

    }

    return (
        <Container maxWidth="lg" sx={{ my: 5, textAlign: 'center' }}>
            {photos?.length
                ? <Grid container spacing={6} my={3}>
                    {photos.map((photo, index) => {
                        return <PhotoItem key={photo.id} photo={photo} setPhotoDialog={() => setPhotoDialog(index, photo)} />
                    })}
                </Grid>
                : <Grid container spacing={6} my={3}>{[1, 2, 3, 4, 5, 6].map(i => <VideoItemSkeleton key={i} />)}</Grid>
            }
        </Container>

    );
};

export default Photos;