import { Typography, Container, Box, } from "@mui/material";
import { Link } from "react-router-dom";
import HostItem from "./HostItem";
import publicConcertBgImg from '../../assets/imgs/IMG_1457.JPG';
import familyConcertBgImg from '../../assets/imgs/IMG_1359.jpg';
import privateConcertBgImg from '../../assets/imgs/IMG_1468.JPG';
import schoolVisitBgImg from '../../assets/imgs/img_5053.jpg';

const Host = () => {
    const content = [
        { textContent: 'Public concerts', bgImage: publicConcertBgImg },
        { textContent: 'Family concerts', bgImage: familyConcertBgImg },
        { textContent: 'Private performances', bgImage: privateConcertBgImg },
        { textContent: 'School visits', bgImage: schoolVisitBgImg },
    ];

    return (
        <>
            <Typography variant="h3" textAlign={'center'} my={8} mx={3}>
                {'Bring Relic to You'}
            </Typography>
            <Box mt={2} mb={5}>
                <Container maxWidth={'md'}>
                    <Typography mb={3} textAlign={'left'}>
                        <>We are now accepting proposals for our 2024-2025 season! If you are interested in sponsoring a Relic visit to your region, please {<Link to={'/contact'}>contact us</Link>}! We would love to visit your community! Events in your city could include:</>
                    </Typography>
                </Container>
            </Box>
            <Container disableGutters maxWidth={false} sx={{ mb: 4 }}>
                {content.map(({ textContent, bgImage }, i) => {
                    return <HostItem key={i} bgImage={bgImage} textContent={textContent} right={i % 2} />
                })}
            </Container>
        </>
    );
};

export default Host;



