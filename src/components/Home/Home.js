import Banner from "./Banner";
// import SubscribeForm from "./SubscribeForm";
import Title from "./Title";
// import eventsImage from '../../assets/imgs/ev_img.webp';
// import musicianImage from '../../assets/imgs/IMG_3983.webp';
import ContentSection from "./ContentSection";
import { Container, Typography, } from "@mui/material";
import { useContext } from "react";
import TextContext from "../../context/TextContext";
import banners from '../../data/banners';
// import MediaSection from "../Common/MediaSection";
import VideoWall from "./VideoWall";

const Home = () => {

    const { text } = useContext(TextContext);

    return (
        <>
            <Banner bgPic={banners.groupBanner} children={<Title />} />
            <Container maxWidth="lg" >
                <Typography variant="h3" textAlign={'center'} my={6}>
                    Discover
                </Typography>
                <VideoWall />
                {/* <MediaSection /> */}
                <ContentSection
                    key={text.eventCardInfoTitle}
                    route={text.eventCardRoute}
                    infoTitle={text.eventCardInfoTitle}
                    infoText={text.eventCardInfoText}
                    cardImage={text.eventCardImage}
                />
                <ContentSection
                    key={text.musicianCardInfoTitle}
                    route={text.musicianCardRoute}
                    infoTitle={text.musicianCardInfoTitle}
                    infoText={text.musicianCardInfoText}
                    cardImage={text.musicianCardImage}
                />
            </Container>
        </>
    );
};

export default Home;