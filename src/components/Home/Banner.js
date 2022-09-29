import { Box } from "@mui/material";
import { Parallax } from "react-parallax";
import '@fontsource/lato/400-italic.css';

const Banner = ({ bgPic, height, children }) => {
    return (
        <Box sx={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100vh', background: 'linear-gradient(90deg, rgb(138, 134, 135) 0%, rgb(177, 171, 173) 50%, rgb(167, 161, 163) 100%)'}}>
            <Box height={'15vh'} />
            <Parallax blur={0} bgImage={bgPic} bgImageAlt="banner" strength={150}>
                <Box width="100%" height={height} display="flex" flexDirection="column" alignItems={"center"} justifyContent={'space-between'}>
                    {children}
                </Box>
            </Parallax>
        </Box>
    );
};

export default Banner;