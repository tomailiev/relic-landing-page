import { Skeleton, Typography, Container, } from "@mui/material";
import { useContext } from "react";
import TextContext from "../../context/TextContext";
import banners from '../../data/banners';
import hrpsBG from '../../assets/imgs/hrps.jpg';
import thrbBG from '../../assets/imgs/thrb.jpg';
import AboutItem from "./AboutItem";
import CustomDivider from "../Common/CustomDivider";

const Story = () => {

    const { text } = useContext(TextContext);

    return (
        <>
            <Container disableGutters maxWidth={false}>
                <img src={banners.storyBanner} width="100%" height={'auto'} alt="banner" />
                <Skeleton variant="rectangular" width={"100%"} height={'auto'} />
            </Container>
            <Typography variant="h3" textAlign={'center'} m={5}>
                About us
            </Typography>
            <AboutItem title={'Our bio'} textContent={text.aboutBio} bg={hrpsBG} />
            <CustomDivider />
            <AboutItem title={'Our values'} textContent={text.aboutValues} bg={thrbBG} right />
            <CustomDivider />
            <AboutItem title={'Our mission'} textContent={text.aboutMission} bg={hrpsBG} />
            <CustomDivider />
            <AboutItem title={'Our story'} textContent={text.aboutStory} bg={thrbBG} right />
        </>
    );
};

export default Story;