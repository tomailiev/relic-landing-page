import Banner from "./Banner";
// import SubscribeForm from "./SubscribeForm";
import Title from "./Title";
import homeBanner from '../../assets/banners/homeBanner_grayscale.webp';
import eventsImage from '../../assets/imgs/ev_img.webp';
import musicianImage from '../../assets/imgs/IMG_3983.webp';
import ContentSection from "../Common/ContentSection";
import { Container, Typography } from "@mui/material";

const Home = () => {
    const contentSections = [
        {
            infoTitle: 'Upcoming events',
            infoText: 'Our inaugural week is quickly approaching. We have an exciting program of baroque music favorites that we are looking forward to presenting in Kalamazoo, MI this September.',
            cardImage: eventsImage,
            cardTitle: 'Autumn Rising',
            cardTexts: ['September 8-10, 2022', 'Kalamazoo, MI']
        },
        {
            infoTitle: 'Our Musicians',
            infoText: 'Find out who we are and what we do!',
            cardImage: musicianImage,
            cardTitle: 'Our musicians',
            cardTexts: ['Co-founder & violinist Kako Miura', 'PC: Sam Brewer']
        }
    ];

    return (
        <>
            <Banner bgPic={homeBanner} height={'88vh'} children={<Title />} />
            <Container maxWidth="lg" >
                <Typography variant="h3" textAlign={'center'}>
                    Discover
                </Typography>
                {contentSections.map(content => <ContentSection key={content.cardTitle} content={content} />)}
            </Container>
        </>
    );
};

export default Home;