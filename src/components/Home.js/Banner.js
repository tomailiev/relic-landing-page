import { Box } from "@mui/material";
import { Parallax } from "react-parallax";
import '@fontsource/lato/400-italic.css';

const Banner = ({ textComponent, bgUrl, height, minBlur, maxBlur }) => {
    return (
        <Parallax blur={{ min: minBlur || 2, max: maxBlur || 5 }} bgImage={bgUrl} bgImageAlt="the cat" strength={350}>
            <Box width={'98vw'} height={height} display="flex" flexDirection="column" alignItems={"center"} justifyContent="center">
                <Box maxWidth='md' paddingX={2}>
                    {textComponent}
                </Box>
            </Box>
        </Parallax>
    );
};

export default Banner;