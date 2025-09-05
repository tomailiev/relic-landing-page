import { Typography, Container, Box, } from "@mui/material";
import AboutItem from "./AboutItem";
import banners from "../../data/banners";

const Story = ({ content, pageTitle }) => {


    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    height: { xs: 300, sm: 500, },
                    backgroundImage: `url(${banners.story.storyBanner})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    mb: 3,
                }}
            />
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