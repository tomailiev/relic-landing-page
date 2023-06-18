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
                <Typography variant="h3" textAlign={'center'} mt={8}>
                    Discover
                </Typography>
                <VideoWall />
                {/* <MediaSection /> */}
                {text.contentSections.map((content, i) => <ContentSection key={content.cardTitle} content={content} index={i} />)}
            </Container>
        </>
    );
};

export default Home;