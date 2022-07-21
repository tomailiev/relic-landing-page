import {  Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
// import Bio from "./Bio";
import founders from '../../data/founders.json';
import musiciansBanner from '../../assets/banners/relic_musicians.webp';
import MusicianCard from "./MusicianCard";

const Musicians = () => {

    return (
            <>
                <Container maxWidth={false} sx={{px: 0}}>
                    <img src={musiciansBanner} width="100%" height={'auto'} alt="banner" />
                </Container>
                <Container maxWidth="lg" sx={{ my: 5, textAlign: 'center' }}>
                    <Typography variant="h2" >
                        Musicians
                    </Typography>
                    <Grid container spacing={6} mt={3}>
                        {founders.map(({ name, pic, bio, title }, i) => {
                            return (
                                <Grid key={name} item xs={12} md={6}>
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