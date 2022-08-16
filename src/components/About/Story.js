import { Grid, Skeleton, Typography, Container, Divider, List, Paper, Accordion, AccordionSummary, AccordionDetails, } from "@mui/material";
import StoryListItem from "./StoryListItem";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useContext } from "react";
import TextContext from "../../context/TextContext";
import BannerContext from "../../context/BannerContext";

const Story = () => {

    const { text } = useContext(TextContext);
    const { allBanners } = useContext(BannerContext);

    return (
        <>
            <Container disableGutters maxWidth={false}>
                <img src={allBanners.musiciansBanner} width="100%" height={'auto'} alt="banner" />
                <Skeleton variant="rectangular" width={"100%"} height={'auto'} />
            </Container>
            <Container maxWidth="lg">
                <Typography variant="h3" textAlign={'center'} mb={3}>
                    Our Story
                </Typography>
                <Grid container spacing={3} my={2} component={Paper}>
                    <Grid item xs={12} md={8} p={3}>
                        <Typography mb={2}>
                            {text.storyGroupBio}
                        </Typography>
                        <Divider />
                        <Typography mt={2}>
                            {text.storyAddress}
                        </Typography>
                        <List>
                            {text.storyActionItems.map(({ text, icon, more }) => <StoryListItem key={text} text={text} icon={icon} more={more} />)}
                        </List>
                    </Grid>
                    <Grid item xs={12} md={4} p={3}>
                        <Typography variant="h4" textAlign={'center'} mb={1}>
                            Quick facts
                        </Typography>
                        {text.storyQandAs.map(({ q, a }) => (
                            <Accordion key={q}>
                                <AccordionSummary
                                    expandIcon={<ChevronRightIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography variant="h6">{q}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography sx={{ whiteSpace: 'pre-line' }}>
                                        {a}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Story;