import { Divider, Grid, List, Typography } from "@mui/material";
import { Container } from "@mui/system";
// import Bio from "./Bio";
// import founders from '../../data/founders.json';
// import MusicianCard from "./MusicianCard";
import { useEffect } from "react";
import { useState } from "react";
import { downloadDocs } from "../../utils/firebase/firestore-funcs";
import banners from '../../data/banners';
import MusicianLI from "./MusicianLI";
// import Banner from "../Home/Banner";

const placeholder = {
    violin: [],
    viola: [],
    cello: [],
    theorbo: [],
    bass: [],
    harpsichord: [],
    oboe: [],
    basson: [],
    flute: []
};

const Musicians = () => {

    const [musicians, setMusicians] = useState(placeholder);

    useEffect(() => {
        downloadDocs('musicians', ['featured', '==', true], 'name')
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
            <Container disableGutters maxWidth={false}>
                <img src={banners.musiciansBanner} width="100%" height={'auto'} alt="banner" />
            </Container>
            {/* <Banner bgPic={banners.musiciansBanner} height={80} /> */}
            <Container maxWidth="lg" sx={{ my: 5, textAlign: 'center' }}>
                <Typography variant="h3" >
                    Musicians
                </Typography>
                <Grid container spacing={6} my={3}>
                    <Grid item xs={12} md={6}>
                        <Typography variant={'h6'}>violin</Typography>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {musicians.violin?.map(({ name, pic, bio, title, id, founder }) => {
                                return <MusicianLI key={id} name={name} picUrl={pic} bio={bio} title={title} founder={founder} />
                            })}
                        </List>
                        {musicians.viola && <Typography variant={'h6'}>viola</Typography>}
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {musicians.viola?.map(({ name, pic, bio, title, id, founder }) => {
                                return <MusicianLI key={id} name={name} picUrl={pic} bio={bio} title={title} founder={founder} />
                            })}
                        </List>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant={'h6'}>cello</Typography>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {musicians.cello?.map(({ name, pic, bio, title, id, founder }) => {
                                return <MusicianLI key={id} name={name} picUrl={pic} bio={bio} title={title} founder={founder} />
                            })}
                        </List>
                        <Typography variant={'h6'}>bass</Typography>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {musicians.bass?.map(({ name, pic, bio, title, id, founder }) => {
                                return <MusicianLI key={id} name={name} picUrl={pic} bio={bio} title={title} founder={founder} />
                            })}
                        </List>
                        <Typography variant={'h6'}>theorbo</Typography>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {musicians.theorbo?.map(({ name, pic, bio, title, id, founder }) => {
                                return <MusicianLI key={id} name={name} picUrl={pic} bio={bio} title={title} founder={founder} />
                            })}
                        </List>
                        <Typography variant={'h6'}>harpsichord</Typography>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {musicians.harpsichord?.map(({ name, pic, bio, title, id, founder }) => {
                                return <MusicianLI key={id} name={name} picUrl={pic} bio={bio} title={title} founder={founder} />
                            })}
                        </List>
                    </Grid>

                </Grid>
                <Divider />
                <Typography variant="body2"padding={2}>* indicates Relic founders</Typography>
            </Container>
        </>
    );
};

export default Musicians;