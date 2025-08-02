// import { useTheme } from "@emotion/react";
import { Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box, Container } from "@mui/system";

const AboutItem = ({ title, textContent, right }) => {

    const theme = useTheme();
    const smMatch = useMediaQuery(theme.breakpoints.down('md'));

    const gradients = {
        mobile: `linear-gradient(90deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.light} 40%, ${theme.palette.secondary.light} 60%, ${theme.palette.secondary.dark} 100%);`,
        right: `linear-gradient(90deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.light} 100%);`,
        left: `linear-gradient(90deg, ${theme.palette.secondary.light}, ${theme.palette.secondary.dark} 100%);`
    }

    // const bgCss = {
    //     position: 'relative',
    //     '&::after': {
    //         background: `right / cover repeat-y ${gradients.mobile}`,
    //         position: 'absolute',
    //         top: 0,
    //         bottom: 0,
    //         left: 0,
    //         right: 0,
    //         content: "''",
    //         opacity: 0.9,
    //         // filter: 'sepia(70%)',
    //         zIndex: -1
    //     }
    // };

    const textCss = {
        width: smMatch ? '90%' : '70%',
        background: 'white',
        zIndex: 1,
        textAlign: smMatch ? 'left' : right ? 'right' : 'left',
        p: 2,
        left: smMatch ? '5%' : right ? 0 : '30%',
        position: 'relative',
        minHeight: '250px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderBottomLeftRadius: smMatch || !right ? 10 : 0,
        borderTopLeftRadius: smMatch || !right ? 10 : 0,
        borderBottomRightRadius: smMatch || right ? 10 : 0,
        borderTopRightRadius: smMatch || right ? 10 : 0,
    };

    return (
        <Container maxWidth="false" disableGutters>
            <Box mb="0" py={smMatch ? 2 : 4} sx={{background: `center / cover repeat-y ${gradients.mobile}`}}>
                <Paper square elevation={2} sx={textCss}>
                    <Typography variant="h6" fontWeight={700}>
                        {title}
                    </Typography>
                    <Typography variant="body1" fontSize={smMatch ? '1em' : '1.2em'}>
                        {textContent}
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default AboutItem;