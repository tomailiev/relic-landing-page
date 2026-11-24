import { Box, Container, Grid, Typography } from "@mui/material";
import { bgs } from "../../data/images";
import Seo from "../Common/SEO";
import albumPhoto from '../../assets/imgs/O_CD_TR.png';
import { useContext } from "react";
import TextContext from "../../context/TextContext";

const Album = () => {

    const { text } = useContext(TextContext);
    const sponsors = text.albumSponsors?.split('\\n');

    return (
        <>
            <Seo title={'Debut Album'} description={'Debut Album Recording Project'} />
            <Box sx={{ background: `center / cover url(${bgs.generalBg}) repeat-y`, py: 2 }}>
                <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" my={8} fontWeight={'600'} color={'secondary.main'}>
                        Debut Album
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Typography textAlign={'left'} color="secondary" variant="body1" fontWeight={600} fontSize={{ xs: '1.4em', md: '1.3em' }}>
                                {text.albumGeneral}
                            </Typography>

                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }} order="0">
                            <Box maxHeight={'100%'}>
                                <img src={albumPhoto} alt="album cover" style={{ maxWidth: '80%' }} />
                            </Box>
                        </Grid>
                    </Grid>
                    <Box textAlign={'left'} mt={2}>
                        <Typography variant="h6" fontSize={'1.3em'} color="secondary" fontWeight={'bold'} mb={1}>
                            The Program
                        </Typography>
                        <Typography mt={1} textAlign={'left'} color="secondary" variant="body1" fontWeight={600} fontSize={{ xs: '1.4em', md: '1.3em' }}>
                            {text.albumProgram}
                        </Typography>
                    </Box>
                    <Box textAlign={'left'} mt={4}>
                        <Typography variant="h6" fontSize={'1.3em'} color="secondary" fontWeight={'bold'} mb={1}>
                            Funding
                        </Typography>
                        <Typography mt={1} textAlign={'left'} color="secondary" variant="body1" fontWeight={600} fontSize={{ xs: '1.4em', md: '1.3em' }}>
                            {text.albumFunding}
                        </Typography>
                    </Box>
                    <Box textAlign={'left'} mt={4} mb={4}>
                        <Typography variant="h6" fontSize={'1.3em'} color="secondary" fontWeight={'bold'} mb={2}>
                            Project Sponsors
                        </Typography>
                        {sponsors?.map(sponsor => {
                            return <Typography display={'block'} key={sponsor} textAlign={'left'} color="secondary" variant="body1" fontWeight={600} fontSize={{ xs: '1.4em', md: '1.3em' }}>
                                {sponsor}
                            </Typography>
                        })}
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default Album;