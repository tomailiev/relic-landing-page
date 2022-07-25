import { Box } from "@mui/material";
import { Parallax } from "react-parallax";
import '@fontsource/lato/400-italic.css';

const Banner = ({bgPic, height, children}) => {
    return (
        <Parallax blur={0} bgImage={bgPic} bgImageAlt="banner" strength={150}>
            <Box width="100%" height={height} display="flex" flexDirection="column" alignItems={"center"} justifyContent={'space-between'}>
                {children}
            </Box>
        </Parallax>
    );
};

export default Banner;