import { Skeleton, Typography, Container, } from "@mui/material";
import { useContext } from "react";
import TextContext from "../../context/TextContext";
import banners from '../../data/banners';
import hrpsBG from '../../assets/imgs/hrps.jpg';
import thrbBG from '../../assets/imgs/thrb.jpg';
import AboutItem from "./AboutItem";
// import CustomDivider from "../Common/CustomDivider";

const Story = () => {

    const { text } = useContext(TextContext);

    return (
        <>
            <Container disableGutters maxWidth={false}>
                <img src={banners.storyBanner} width="100%" height={'auto'} alt="banner" />
                <Skeleton variant="rectangular" width={"100%"} height={'auto'} />
            </Container>
            <Typography variant="h3" textAlign={'center'} m={5}>
                About Us
            </Typography>
            <Container disableGutters maxWidth={false} sx={{ my: 3 }}>
                <AboutItem title={'bio'} textContent={text.aboutBio} bg={hrpsBG} />
                {/* <CustomDivider /> */}
                <AboutItem title={'story'} textContent={text.aboutStory} bg={thrbBG} right />
                {/* <CustomDivider /> */}
                <AboutItem title={'mission'} textContent={text.aboutMission} bg={hrpsBG} />
                {/* <CustomDivider /> */}
                <AboutItem title={'values'} textContent={text.aboutValues} bg={thrbBG} right />
            </Container>
        </>
    );
};

export default Story;