import { Typography, Container, } from "@mui/material";
import { useContext } from "react";
import TextContext from "../../context/TextContext";
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
            <Typography variant="h3" textAlign={'center'} my={8} mx={3}>
                About Us
            </Typography>
            <Container disableGutters maxWidth={false} sx={{ mb: 4 }}>
                <AboutItem title={'bio'} textContent={text.aboutBio} />
                <AboutItem title={'story'} textContent={text.aboutStory} right />
                <AboutItem title={'mission'} textContent={text.aboutMission} />
                <AboutItem title={'values'} textContent={text.aboutValues} right />
            </Container>
        </>
    );
};

export default Story;