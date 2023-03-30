import { Divider, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect } from "react";
import { useState } from "react";
import { downloadDocs } from "../../utils/firebase/firestore-funcs";
import MusicianGroup from "./MusicianGroup";
import getBannerSx from "../../styles/bannerSx";
import useDimensions from "../../hooks/useDimensions";

const placeholder = {
    violin: [],
    viola: [],
    cello: [],
    theorbo: [],
    bass: [],
    harpsichord: [],
    oboe: [],
    bassoon: [],
    flute: []
};

const Musicians = () => {

    const [musicians, setMusicians] = useState(placeholder);
    const dimensions = useDimensions();

    useEffect(() => {
        downloadDocs('musicians', ['featured', '==', true], ['name'])
            .then((docs) => {
                setMusicians(docs.reduce((prev, curr) => {
                    if (!prev[curr.newTitle]) prev[curr.newTitle] = [];
                    prev[curr.newTitle].push(curr);
                    return prev;
                }, {}));
            })
            .catch(e => {
                console.error('not found');
                console.error(e);
            })
    }, []);

    return (
        <>
            <Container disableGutters maxWidth={false} sx={getBannerSx(dimensions.width * 0.2813, 'musicians')}>
            </Container>
            <Container maxWidth="lg" sx={{ my: 5, textAlign: 'center' }}>
                <Typography variant="h3" >
                    Musicians
                </Typography>
                <Grid container spacing={6} my={3}>
                    <Grid item xs={12} md={6}>
                        <Typography variant={'h6'} textAlign={'left'}>Violin</Typography>
                        <MusicianGroup section={musicians.violin} />
                        <Typography variant={'h6'} textAlign={'left'}>Viola</Typography>
                        <MusicianGroup section={musicians.viola} />
                        <Typography variant={'h6'} textAlign={'left'}>Cello</Typography>
                        <MusicianGroup section={musicians.cello} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant={'h6'} textAlign={'left'}>Bassoon</Typography>
                        <MusicianGroup section={musicians.bassoon} />
                        <Typography variant={'h6'} textAlign={'left'}>Bass</Typography>
                        <MusicianGroup section={musicians.bass} />
                        <Typography variant={'h6'} textAlign={'left'}>Theorbo</Typography>
                        <MusicianGroup section={musicians.theorbo} />
                        <Typography variant={'h6'} textAlign={'left'}>Harpsichord</Typography>
                        <MusicianGroup section={musicians.harpsichord} />
                    </Grid>
                </Grid>
                <Divider />
            </Container>
        </>
    );
};

export default Musicians;