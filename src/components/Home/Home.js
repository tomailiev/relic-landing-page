import Banner from "./Banner";
// import SubscribeForm from "./SubscribeForm";
import Title from "./Title";
// import eventsImage from '../../assets/imgs/ev_img.webp';
// import musicianImage from '../../assets/imgs/IMG_3983.webp';
import { Box, Container, Paper, Typography, } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import TextContext from "../../context/TextContext";
import banners from '../../data/banners';
// import MediaSection from "../Common/MediaSection";
import VideoWall from "./VideoWall";
import { downloadDocsV2 } from "../../utils/firebase/firestore-funcs";
import EventCardNew from "../Events/EventCardNew";
import ReviewSection from "./ReviewSection";
import AboutSection from "./AboutSection";

const Home = () => {

    const { text } = useContext(TextContext);
    const [nextEvent, setNextEvent] = useState(null);

    useEffect(() => {
        downloadDocsV2('events', [
            { value: ['dateDone', '>', new Date()], type: 'condition' },
            { type: 'sorting', value: ['dateDone', 'asc'] },
            { value: [1], type: 'limit' }
        ])
            .then(docs => {
                setNextEvent(docs[0]);
            })
            .catch(e => {
                console.error('not found');
                console.error(e);
            })
    }, []);

    return (
        <Box
            // sx={{ background: `center / cover url(${bgs.generalBg})` }}
        >
            <Banner bgPic={banners.groupBanner} children={<Title />} />
            <Container maxWidth="false" disableGutters>
                {nextEvent && <>
                    {/* <Typography variant="h3" textAlign={'center'} my={6}>
                        Upcoming
                    </Typography> */}
                    <Paper elevation={0} sx={{
                        // my: 2,
                        borderRadius: 0,
                        backgroundColor: '#244458',
                        position: 'relative',
                        overflow: 'hidden',
                        height: '100%',
                        width: '100%',
                        textAlign: 'center'

                    }}>
                        <Typography my={1} variant="h6" fontWeight={600} color={'#ffffff'}>Next event coming up soon!</Typography>
                    </Paper>
                    <EventCardNew event={nextEvent} />

                </>}
                <Typography variant="h3" textAlign={'center'} color={'#000000'} fontWeight={600} my={6}>
                    Discover
                </Typography>
                <ReviewSection
                    key={text.reviewCardInfoTitle}
                    infoText={text.reviewCardInfoText}
                    infoTitle={text.reviewCardInfoTitle}
                    buttonText={'Full Review'}
                    route={text.reviewCardRoute}
                    reviewSource={text.reviewCardSource}
                />
                <VideoWall />
                <AboutSection
                    key={text.musicianCardInfoTitle}
                    // route={text.musicianCardRoute}
                    infoTitle={text.musicianCardInfoTitle}
                    infoText={text.aboutBioShort}
                    cardImage={text.musicianCardImage}
                    route={text.musicianCardRoute}
                />
            </Container>
        </Box>
    );
};

export default Home;