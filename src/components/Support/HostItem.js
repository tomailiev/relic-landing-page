// import { useTheme } from "@emotion/react";
import { Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useState } from "react";

const HostItem = ({ textContent, right, bgImage }) => {

    const [isSelected, setIsSelected] = useState(false);
    const theme = useTheme();
    const smMatch = useMediaQuery(theme.breakpoints.down('md'));

    const bgCss = {
        position: 'relative',
        cursor: 'pointer',
        '&::after': {
            background: `right / cover repeat-y url(${bgImage})`,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: smMatch ? 0 : right ? '50%' : 0,
            right: smMatch ? 0 : right ? 0 : '50%',
            content: "''",
            opacity: 0.9,
            // filter: 'sepia(70%)',
            zIndex: -1
        }
    };

    const textCss = {
        width: smMatch ? '90%' : '70%',
        background: smMatch ? `linear-gradient(90deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.75) 40%, rgba(255, 255, 255, 0.25) 60%, rgba(255, 255, 255, 0) 100%);` :'rgba(255, 255, 255, 0.75)',
        zIndex: 1,
        textAlign: smMatch ? 'left' : right ? 'right' : 'left',
        p: 2,
        left: smMatch ? '5%' : right ? 0 : '30%',
        position: 'relative',
        minHeight: '280px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        transition: 'left 0.6s ease-in-out'
    };

    return (
        <Container maxWidth="lg">
            <Box mb={smMatch ? 3 : 0} py={smMatch ? 2 : 4} sx={bgCss} onMouseOver={() => setIsSelected(true)} onMouseOut={() => setIsSelected(false)}>
                <Paper square elevation={0} sx={isSelected ? {
                    ...textCss,
                    left: smMatch ? '5%' : right ? '-20%' : '50%',
                    transition: 'left 1s ease-out'
                } : textCss}>
                    <Typography variant="body1" fontSize={smMatch ? '1em' : '1.2em'}>
                        {textContent}
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default HostItem;