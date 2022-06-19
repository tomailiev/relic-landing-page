import { Typography, useTheme } from "@mui/material"

const Intro = () => {
    const theme = useTheme();
    return (
        <Typography fontSize={24} fontStyle="italic" sx={{
            background: theme.palette.background.textGradient, paddingX: '15px', paddingY: '25px', borderRadius: '5px'
        }}>
            Relic is a brand new music ensemble aiming to bring high quality music making and dramatic narative to the same stage. We believe in sharing close, personal musical experiences with our audiences and presenting music as a storytelling device.
        </Typography>
    );
};

export default Intro;