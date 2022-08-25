import Banner from "./Banner";
// import SubscribeForm from "./SubscribeForm";
import Title from "./Title";
// import eventsImage from '../../assets/imgs/ev_img.webp';
// import musicianImage from '../../assets/imgs/IMG_3983.webp';
import ContentSection from "../Common/ContentSection";
import { Container, Typography } from "@mui/material";
import { useContext } from "react";
import TextContext from "../../context/TextContext";


const Home = () => {

    const { text } = useContext(TextContext);

    return (
        <>
            <Banner height={'88vh'} children={<Title />} />
            <Container maxWidth="lg" >
                <Typography variant="h3" textAlign={'center'}>
                    Discover
                </Typography>
                {text.contentSections.map(content => <ContentSection key={content.cardTitle} content={content} />)}
            </Container>
        </>
    );
};

export default Home;