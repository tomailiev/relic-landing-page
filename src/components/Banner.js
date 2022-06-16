import { Box, Typography } from "@mui/material";
import { Parallax } from "react-parallax";
import bgPic from '../imgs/10bg.jpg';
import '@fontsource/lato/400-italic.css';

const Banner = () => {
    return (
        <Parallax blur={{ min: 2, max: 5 }} bgImage={bgPic} bgImageAlt="the cat" strength={350}>
            <Box width="98vw" height="600px" display="flex" flexDirection="column" alignItems={"center"} justifyContent="center">
                <Box maxWidth={800} marginX={2}>
                    <Typography fontSize={24} fontStyle="italic" sx={{
                        background: '#f4e5cf', padding: '15px', WebkitBoxShadow: "0px 5px 2px 0px rgba(0,0,0,0.58)",
                        boxShadow: "0px 5px 2px 0px rgba(0,0,0,0.58)", borderRadius: '5px'
                    }}>
                        Inspiring audiences by bringing relics of the past to life through [sensitive and theatrical productions?]. Played by musicians [devoted/committed] to camaraderie and connection while collectively searching for [the deeper meaning of humanity] through creating together.
                    </Typography>
                </Box>
            </Box>
        </Parallax>
    );
};

export default Banner;