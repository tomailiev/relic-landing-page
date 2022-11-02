import { Skeleton, Typography, Container, } from "@mui/material";
import { useContext } from "react";
import TextContext from "../../context/TextContext";
import banners from '../../data/banners';
import { Box } from "@mui/system";
import hrpsBG from '../../assets/imgs/hrps.jpg';
import thrbBG from '../../assets/imgs/thrb.jpg';

const Story = () => {

    const { text } = useContext(TextContext);

    return (
        <>
            <Container disableGutters maxWidth={false}>
                <img src={banners.storyBanner} width="100%" height={'auto'} alt="banner" />
                <Skeleton variant="rectangular" width={"100%"} height={'auto'} />
            </Container>
            <Typography variant="h3" textAlign={'center'}>
                About us
            </Typography>
            <Container maxWidth="lg">
                <Box m={2} p={3} sx={{ position: 'relative', '&::after': { background: `right / cover repeat-y url(${hrpsBG})`, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, content: "''", opacity: '0.5', filter: 'blur(5px)' } }}>
                    <Typography variant="h6" mb={1}>
                        Our Bio
                    </Typography>
                    <Typography variant="body1">
                        {text.aboutBio}
                    </Typography>
                </Box>
            </Container>
            <Container maxWidth="lg">
                <Box m={2} p={3} sx={{ position: 'relative', '&::after': { background: `right / cover repeat-y url(${thrbBG})`, position: 'absolute', top: 0, bottom: 0, left: '50%', right: 0, content: "''", opacity: '0.5', filter: 'blur(5px)' } }}>
                    <Typography variant="h6" mb={1}>
                        Our Story
                    </Typography>
                    <Typography variant="body1">
                        {text.aboutStory}
                    </Typography>
                </Box>
            </Container>
            <Container maxWidth="lg">
                <Box m={2} p={3} sx={{ position: 'relative', '&::after': { background: `right / cover repeat-y url(${hrpsBG})`, position: 'absolute', top: 0, bottom: 0, left: 0, right: '50%', content: "''", opacity: '0.5', filter: 'blur(5px)' } }}>
                    <Typography variant="h6" mb={1}>
                        Our Mission
                    </Typography>
                    <Typography variant="body1">
                        {text.aboutMission}
                    </Typography>
                </Box>
            </Container>
            <Container maxWidth="lg">
                <Box m={2} p={3} sx={{ position: 'relative', '&::after': { background: `right / cover repeat-y url(${thrbBG})`, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, content: "''", opacity: '0.5', filter: 'blur(5px)' } }}>
                    <Typography variant="h6" mb={1}>
                        Our Values
                    </Typography>
                    <Typography variant="body1">
                        {text.aboutValues}
                    </Typography>
                </Box>
            </Container>
        </>
    );
};

export default Story;