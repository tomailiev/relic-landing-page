import { Typography, Container, } from "@mui/material";
import AboutItem from "./AboutItem";
import useDimensions from "../../hooks/useDimensions";
import getBannerSx from "../../styles/bannerSx";

const Story = ({ content, pageTitle }) => {

    const dimensions = useDimensions();

    return (
        <>
            <Container disableGutters maxWidth={false} sx={getBannerSx(dimensions.width * 0.3005, 'story')}>
            </Container>
            <Typography variant="h3" textAlign={'center'} my={8} mx={3}>
                {pageTitle}
            </Typography>
            <Container disableGutters maxWidth={false} sx={{ mb: 4 }}>
                {content.map(({textContent}, i) => {
                    return <AboutItem key={i} textContent={textContent} right={i % 2} />
                })}
                {/* <AboutItem title={'bio'} textContent={text.aboutBio} />
                <AboutItem title={'story'} textContent={text.aboutStory} right />
                <AboutItem title={'mission'} textContent={text.aboutMission} />
                <AboutItem title={'values'} textContent={text.aboutValues} right /> */}
            </Container>
        </>
    );
};

export default Story;