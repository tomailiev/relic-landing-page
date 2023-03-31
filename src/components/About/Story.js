import { Typography, Container, } from "@mui/material";
import { useContext } from "react";
import TextContext from "../../context/TextContext";
import hrpsBG from '../../assets/imgs/hrps.jpg';
import thrbBG from '../../assets/imgs/thrb.jpg';
import AboutItem from "./AboutItem";
import useDimensions from "../../hooks/useDimensions";
import getBannerSx from "../../styles/bannerSx";

const Story = () => {

    const { text } = useContext(TextContext);
    const dimensions = useDimensions();

    return (
        <>
            <Container disableGutters maxWidth={false} sx={getBannerSx(dimensions.width * 0.3005, 'story')}>
            </Container>
            <Typography variant="h3" textAlign={'center'} mt={6} mb={10}>
                About Us
            </Typography>
            <Container disableGutters maxWidth={false} sx={{ my: 4 }}>
                <AboutItem title={'bio'} textContent={text.aboutBio} bg={hrpsBG} />
                <AboutItem title={'story'} textContent={text.aboutStory} bg={thrbBG} right />
                <AboutItem title={'mission'} textContent={text.aboutMission} bg={hrpsBG} />
                <AboutItem title={'values'} textContent={text.aboutValues} bg={thrbBG} right />
            </Container>
        </>
    );
};

export default Story;