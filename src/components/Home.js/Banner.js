import { Box } from "@mui/material";
import { Parallax } from "react-parallax";
import '@fontsource/lato/400-italic.css';

const Banner = ({ textComponent, bgUrl }) => {
    return (
        <Parallax blur={{ min: 2, max: 5 }} bgImage={bgUrl} bgImageAlt="the cat" strength={350}>
            <Box width="98vw" height="600px" display="flex" flexDirection="column" alignItems={"center"} justifyContent="center">
                <Box maxWidth={800} marginX={2}>
                    {textComponent}
                </Box>
            </Box>
        </Parallax>
    );
};

export default Banner;