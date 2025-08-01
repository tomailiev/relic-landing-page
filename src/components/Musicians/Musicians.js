import { Grid, Skeleton, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect } from "react";
import { useState } from "react";
import { fetchCurrentMusicians } from "../../utils/firebase/firestore-funcs";
// import MusicianGroup from "./MusicianGroup";
import getBannerSx from "../../styles/bannerSx";
import useDimensions from "../../hooks/useDimensions";
import MusicianLI from "./MusicianLI";

// const placeholder = {
//     violin: [],
//     viola: [],
//     cello: [],
//     theorbo: [],
//     bass: [],
//     harpsichord: [],
//     oboe: [],
//     bassoon: [],
//     flute: []
// };

const Musicians = () => {

    const [musicians, setMusicians] = useState([]);
    const dimensions = useDimensions();
    const date = new Date();
    const month = date.getMonth();
    const seasonSwitch = month >= 7;
    const season = seasonSwitch ? date.getFullYear() - 2021 : date.getFullYear() - 2022;

    useEffect(() => {
        fetchCurrentMusicians({ sorting: 'name', order: 'asc' })
            .then(({ data }) => {
                if (data) {
                    setMusicians(data);
                }
            })
            .catch(e => {
                console.error('not found');
                console.error(e);
            })
    }, [season]);

    return (
        <>
            <Container disableGutters maxWidth={false} sx={getBannerSx(dimensions.width * 0.2813, 'musicians')}>
            </Container>
            <Container maxWidth="lg" sx={{ my: 5, px: { xs: 2, sm: 10 }, textAlign: 'center' }}>
                <Typography variant="h3" my={8}>
                    Musicians
                </Typography>
                <Grid container spacing={{ xs: 3, sm: 0.7 }} direction="column">
                    {musicians.length
                        ? musicians.map(({ name, pic, bio, id, chair, newTitle }) => <Grid item key={id} ><MusicianLI name={name} picUrl={pic} bio={bio} chair={chair} title={newTitle} /></Grid>)
                        : Array.from({ length: 3 }).map((_, i) => <Box sx={{ my: { xs: 3, sm: 0.7 }, ml: { xs: 3, sm: 0 } }}>
                            <Skeleton variant="rectangular" width="100%" sx={{ borderRadius: 3, height: { xs: 400, sm: 122 } }} />
                        </Box>)
                    }
                    {/* <Grid item >
                        <Typography variant={'h6'} textAlign={'left'}>Violin</Typography>
                        <MusicianGroup section={musicians.violin} length={5} />
                        <Typography variant={'h6'} textAlign={'left'}>Viola</Typography>
                        <MusicianGroup section={musicians.viola} length={2} />
                        <Typography variant={'h6'} textAlign={'left'}>Cello</Typography>
                        <MusicianGroup section={musicians.cello} />
                        <Typography variant={'h6'} textAlign={'left'}>Bassoon</Typography>
                        <MusicianGroup section={musicians.bassoon} />
                        <Typography variant={'h6'} textAlign={'left'}>Bass</Typography>
                        <MusicianGroup section={musicians.bass} />
                        <Typography variant={'h6'} textAlign={'left'}>Theorbo</Typography>
                        <MusicianGroup section={musicians.theorbo} />
                        <Typography variant={'h6'} textAlign={'left'}>Harpsichord</Typography>
                        <MusicianGroup section={musicians.harpsichord} />
                    </Grid> */}
                </Grid>
            </Container>
        </>
    );
};

export default Musicians;