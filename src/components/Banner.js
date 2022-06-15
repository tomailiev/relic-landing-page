import { Box, Typography } from "@mui/material";
import { Parallax } from "react-parallax";
import bgPic from '../imgs/10bg.jpg';
import '@fontsource/lato/400-italic.css';

const Banner = () => {
    return (
        <Parallax blur={{ min: 4, max: 6 }} bgImage={bgPic} bgImageAlt="the cat" strength={350}>
            <Box width="98vw" height="600px" display="flex" flexDirection="column" alignItems={"center"} justifyContent="center">
                <Box maxWidth={800} marginX={2}>
                    <Typography fontFamily="lato" fontSize={20}>
                        Inspiring audiences by bringing relics of the past to life through [sensitive and theatrical productions?]. Played by musicians [devoted/committed] to camaraderie and connection while collectively searching for [the deeper meaning of humanity] through creating together.
                    </Typography>
                </Box>
            </Box>
        </Parallax>
    );
};

export default Banner;