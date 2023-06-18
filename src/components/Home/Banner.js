import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
// import { Parallax } from "react-parallax";
import '@fontsource/lato/400-italic.css';
import useDimensions from "../../hooks/useDimensions";

const Banner = ({ bgPic, children }) => {

    const theme = useTheme();
    const smMatch = useMediaQuery(theme.breakpoints.down('md'));
    const xsMatch = useMediaQuery(theme.breakpoints.down('sm'));


    const dimensions = useDimensions();

    return (
        <Container sx={{ height: `calc(100vh - ${xsMatch ? 56 : smMatch ? 64 : 80}px)`, }} >
            <Box
                sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    objectFit: 'contain',
                }}
            >
                <Box
                    width={'100%'}
                    height={'100%'}
                    overflow={'hidden'}
                    sx={{ background: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), no-repeat center/${dimensions.width / dimensions.height > 1.5 ? 100 : (dimensions.height / dimensions.width) * 160}% url(${bgPic})`, opacity: 1 }}
                >
                    {children}
                </Box>
            </Box>
        </Container>
    );
};

export default Banner;