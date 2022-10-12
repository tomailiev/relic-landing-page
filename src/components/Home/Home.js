// import Banner from "./Banner";
// import SubscribeForm from "./SubscribeForm";
// import Title from "./Title";
// import eventsImage from '../../assets/imgs/ev_img.webp';
// import musicianImage from '../../assets/imgs/IMG_3983.webp';
import ContentSection from "../Common/ContentSection";
import { Box, Container, Typography, } from "@mui/material";
import { useContext } from "react";
import TextContext from "../../context/TextContext";
import banners from '../../data/banners';
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {

    const { text } = useContext(TextContext);
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });

    useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })

        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    return (
        <>
            <Container sx={{ height: '100vh' }} >
                <Box sx={{ position: 'absolute', width: '100%', height: '100%', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', objectFit: 'contain', }}>
                    <Box width={'100%'} height={'100%'} overflow={'hidden'} sx={{ background: `no-repeat center/${dimensions.width / dimensions.height > 1.5 ? 100 : (dimensions.height / dimensions.width) * 160}% url(${banners.groupBanner})` }}>
                        <Typography maxWidth={'100%'} textAlign={'center'} variant="h1" mt={'85px'} mx={1} color={'white'} zIndex={200} sx={{ position: 'absolute', left: '50%', top: '60%', transform: 'translate(-50%, -50%)' }}>
                            {text.siteHeading || 'relic'}
                        </Typography>
                    </Box>
                </Box>
                <Box height={'95%'} display="flex" flexDirection={'column'} justifyContent="center" mt={1}>
                    {/* <Typography variant="subtitle1">
                    {text.siteSubtitle || 'The period chamber orchestra dedicated to bringing early music to all 50 states'}
                </Typography> */}
                </Box>
            </Container>
            {/* <Banner bgPic={banners.groupBanner} height={'100vh'} children={<Title />} /> */}
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