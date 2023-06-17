import { Box, Container } from "@mui/material";
// import { Parallax } from "react-parallax";
import '@fontsource/lato/400-italic.css';
import useDimensions from "../../hooks/useDimensions";

const Banner = ({ bgPic, height, children }) => {

    const dimensions = useDimensions();

    return (
        // <Box sx={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100vh', background: 'black'}}>
        //     {/* <Box height={'15vh'} /> */}
        //     <Parallax blur={0} bgImage={bgPic} bgImageAlt="banner" strength={150}>
        //         <Box width="100%" height={height} display="flex" flexDirection="column" alignItems={"center"} justifyContent={'space-between'}>
        //             {children}
        //         </Box>
        //     </Parallax>
        // </Box>
        <Container sx={{ height: `${height}vh`, }} >
            <Box
                sx={{
                    position: 'absolute',
                    width: '100%',
                    height: `${height}%`,
                    left: '50%',
                    top: `${height - 50}%`,
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