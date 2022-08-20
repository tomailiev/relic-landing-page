import { Grid, Skeleton, Typography } from "@mui/material";
import { Container } from "@mui/system";
// import Bio from "./Bio";
// import founders from '../../data/founders.json';
import MusicianCard from "./MusicianCard";
import { useEffect } from "react";
import { useState } from "react";
import { downloadDocs } from "../../utils/firebase/firestore-funcs";
import { useContext } from "react";
import BannerContext from "../../context/BannerContext";

const Musicians = () => {

    const { allBanners } = useContext(BannerContext);
    const [founders, setFounders] = useState([]);

    useEffect(() => {
        downloadDocs('musicians', 'featured', 'name')
            .then(docs => setFounders(docs))
            .catch(e => {
                console.error('not found');
                console.error(e);
            })
    });

    return (
        <>
            <Container disableGutters maxWidth={false}>
                <img src={allBanners.musiciansBanner} width="100%" height={'auto'} alt="banner" />
                <Skeleton variant="rectangular" width={"100%"} height={'auto'} />
            </Container>
            <Container maxWidth="lg" sx={{ my: 5, textAlign: 'center' }}>
                <Typography variant="h2" >
                    Musicians
                </Typography>
                <Grid container spacing={6} mt={3}>
                    {founders.map(({ name, pic, bio, title, id }) => {
                        return (
                            <Grid key={id} item xs={12} md={6}>
                                <MusicianCard name={name} picUrl={pic} bio={bio} title={title} />
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </>
    );
};

export default Musicians;