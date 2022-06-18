import { Box, Typography } from "@mui/material";
import { Parallax } from "react-parallax";
import bgPic from '../../imgs/10bg.jpg';
import '@fontsource/lato/400-italic.css';

const Banner = () => {
    return (
        <Parallax blur={{ min: 2, max: 5 }} bgImage={bgPic} bgImageAlt="the cat" strength={350}>
            <Box width="98vw" height="600px" display="flex" flexDirection="column" alignItems={"center"} justifyContent="center">
                <Box maxWidth={800} marginX={2}>
                    <Typography fontSize={24} fontStyle="italic" sx={{
                        background: 'linear-gradient(180deg, rgba(238,222,197,0) 0%, rgba(214,191,162,1) 20%, rgba(214,191,162,1) 80%, rgba(238,222,197,0) 100%)', paddingX: '15px', paddingY: '25px', borderRadius: '5px'
                    }}>
                        Relic is a brand new music ensemble aiming to bring high quality music making and dramatic narative to the same stage. We believe in sharing close, personal musical experiences with our audiences and presenting music as a storytelling device.
                    </Typography>
                </Box>
            </Box>
        </Parallax>
    );
};

export default Banner;