import {  Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
// import Bio from "./Bio";
import founders from '../../data/founders.json';
import musiciansBanner from '../../assets/banners/relic_musicians.webp';
import MusicianCard from "./MusicianCard";

const Musicians = () => {

    return (
            <>
                <Container maxWidth={false}>
                    <img src={musiciansBanner} width="100%" height={'auto'} alt="banner" />
                </Container>
                <Container maxWidth="lg" sx={{ my: 5, textAlign: 'center' }}>
                    <Typography fontFamily="tangerine" variant="h2" >
                        Musicians
                    </Typography>
                    <Grid container>
                        {founders.map(({ name, pic, bio }, i) => {
                            return (
                                <Grid item xs={12} sm={6}>
                                    <MusicianCard />
                                </Grid>
                            );
                        })}
                    </Grid>
                </Container>
            </>
    );
};

export default Musicians;