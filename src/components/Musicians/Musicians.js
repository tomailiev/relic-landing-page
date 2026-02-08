import { Grid, Skeleton, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect } from "react";
import { useState } from "react";
import { fetchCurrentMusicians } from "../../utils/firebase/firestore-funcs";
// import MusicianGroup from "./MusicianGroup";
import MusicianLI from "./MusicianLI";
import banners from "../../data/banners";
import Seo from "../Common/SEO";
// import { bgs } from "../../data/images";

const Musicians = () => {

    const [musicians, setMusicians] = useState([]);

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
    }, []);

    return (
        <>
            <Seo title={"Musicians"} description={"Relic was founded in 2022 by Juilliard graduates Kako Boga, Aniela Eddy, Toma Iliev, Natalie Kress, Rebecca Nelson, and Cullen O'Neil."} />
            <Box
                sx={{
                    width: '100%',
                    height: { xs: 300, sm: 400, md: 500 },
                    backgroundImage: `url(${banners.musicians.musiciansBanner})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    // mb: 3,
                }}
            />
            <Box sx={{ py: 2 }}>
                <Container maxWidth="xl" sx={{ my: 5, px: { xs: 2, sm: 10 }, textAlign: 'center' }}>
                    <Typography variant="h3" my={8} fontWeight={600} >
                        Musicians
                    </Typography>
                    <Grid container spacing={4} display={'flex'} alignItems={'stretch'}>
                        {musicians.length
                            ? musicians.map(({ name, pic, bio, id, chair, newTitle }) => <Grid item key={id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }} display={'flex'}><MusicianLI name={name} picUrl={pic} bio={bio} chair={chair} title={newTitle} /></Grid>)
                            : Array.from({ length: 9 }).map((_, i) => <Grid item key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }} display={'flex'}>
                                <Skeleton variant="rectangular" width="100%" height={414} sx={{ borderRadius: 3, }} />
                            </Grid>)
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
            </Box>
        </>
    );
};

export default Musicians;