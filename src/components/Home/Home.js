import Banner from "./Banner";
// import SubscribeForm from "./SubscribeForm";
import Title from "./Title";
// import eventsImage from '../../assets/imgs/ev_img.webp';
// import musicianImage from '../../assets/imgs/IMG_3983.webp';
import ContentSection from "../Common/ContentSection";
import { Container, Typography, } from "@mui/material";
import { useContext } from "react";
import TextContext from "../../context/TextContext";
import banners from '../../data/banners';
import MediaSection from "../Common/MediaSection";

const Home = () => {

    const { text } = useContext(TextContext);

    return (
        <>
            <Banner height={100} bgPic={banners.groupBanner} children={<Title />} />
            <Container maxWidth="lg" >
                <Typography variant="h3" textAlign={'center'}>
                    Discover
                </Typography>
                <MediaSection content={{id: 'WKlB6mk7EQo'}} />
                {text.contentSections.map((content, i) => <ContentSection key={content.cardTitle} content={content} index={i} />)}
            </Container>
        </>
    );
};

export default Home;