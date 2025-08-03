import Banner from "./Banner";
// import SubscribeForm from "./SubscribeForm";
import Title from "./Title";
// import eventsImage from '../../assets/imgs/ev_img.webp';
// import musicianImage from '../../assets/imgs/IMG_3983.webp';
import ContentSection from "./ContentSection";
import { Container, Typography, } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import TextContext from "../../context/TextContext";
import banners from '../../data/banners';
// import MediaSection from "../Common/MediaSection";
import VideoWall from "./VideoWall";
import { downloadDocsV2 } from "../../utils/firebase/firestore-funcs";
import EventCardNew from "../Events/EventCardNew";
import InternalLink from "./InternalLink";
import ExternalLink from "./ExternalLink";

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
        <>
            <Banner bgPic={banners.groupBanner} children={<Title />} />
            <Container maxWidth="lg" >
                {nextEvent && <>
                    <Typography variant="h3" textAlign={'center'} my={6}>
                        Upcoming
                    </Typography>
                    <EventCardNew event={nextEvent} />
                </>}
                {/* <Typography variant="h3" textAlign={'center'} my={6}>
                    Watch & Listen
                </Typography> */}
                {/* <MediaSection /> */}
                {/* <ContentSection
                    key={text.eventCardInfoTitle}
                    route={text.eventCardRoute}
                    infoTitle={text.eventCardInfoTitle}
                    infoText={text.eventCardInfoText}
                    cardImage={text.eventCardImage}
                    /> */}
                <Typography variant="h3" textAlign={'center'} fontWeight={600} my={6}>
                    Discover
                </Typography>
                <ExternalLink route={text.reviewCardRoute}>
                    <ContentSection
                        key={text.reviewCardInfoTitle}
                        infoText={text.reviewCardInfoText}
                        infoTitle={text.reviewCardInfoTitle}
                        cardImage={text.reviewCardImage}
                        textCss={{ fontStyle: 'italic' }}
                        buttonText={'Full Review'}
                    />
                </ExternalLink>
                <VideoWall />
                <InternalLink route={text.musicianCardRoute}>
                    <ContentSection
                        key={text.musicianCardInfoTitle}
                        // route={text.musicianCardRoute}
                        infoTitle={text.musicianCardInfoTitle}
                        infoText={text.aboutBioShort}
                        cardImage={text.musicianCardImage}
                    />
                </InternalLink>
            </Container>
        </>
    );
};

export default Home;