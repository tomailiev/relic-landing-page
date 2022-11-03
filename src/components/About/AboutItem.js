import { useTheme } from "@emotion/react";
import { Paper, Typography, useMediaQuery } from "@mui/material";
import { Box, Container } from "@mui/system";

const AboutItem = ({ title, bg, textContent, right }) => {

    const theme = useTheme();
    const smMatch = useMediaQuery(theme.breakpoints.down('md'));

    const bgCss = {
        position: 'relative',
        '&::after': {
            background: `right / cover repeat-y url(${bg})`,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: smMatch ? 0 : right ? '50%' : 0,
            right: smMatch ? 0 : right ? 0 : '50%',
            content: "''",
            opacity: 0.9,
            filter: 'blur(3px)',
            zIndex: -1
        }
    };

    const textCss = {
        width: smMatch ? '90%' : '60%',
        background: 'white',
        zIndex: 1,
        textAlign: right ? 'right' : 'left',
        p: 2,
        left: smMatch ? '5%' : right ? 0 : '40%',
        position: 'relative'
    };

    return (
        <Container maxWidth="lg">
            <Box m={2} p={3} sx={bgCss}>
                <Paper sx={textCss}>
                    <Typography variant="h6" mb={1}>
                        {title}
                    </Typography>
                    <Typography variant="body1" fontSize={'1.2em'}>
                        {textContent}
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default AboutItem;