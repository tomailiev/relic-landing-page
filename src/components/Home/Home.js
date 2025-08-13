// import Banner from "./Banner";
import { Box, Container, } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import TextContext from "../../context/TextContext";
import banners from '../../data/banners';
import VideoWall from "./VideoWall";
import { downloadDocsV2 } from "../../utils/firebase/firestore-funcs";
import ReviewSection from "./ReviewSection";
import AboutSection from "./AboutSection";
import BannerParallax from "./BannerParallax";
import EventSection from "./EventSection";

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
        <Box>
            {/* <Banner bgPic={banners.groupBanner} /> */}
            <BannerParallax bgPic={banners.groupBanner} />
            <Container maxWidth="false" disableGutters >

                {nextEvent && <>
                    <EventSection event={nextEvent} />

                </>}
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