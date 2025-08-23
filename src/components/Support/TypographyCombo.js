import { Box, Typography } from "@mui/material";

const TypographyCombo = ({ title, text }) => {

    return (
        <Box sx={{background: 'rgba(247, 244, 235, 0.9)', borderBottom: '2px dashed #252745', p: 3,}}>
            <Typography variant="h6" fontSize={'1.4em'} fontWeight={600}>
                {title}
            </Typography>
            <Typography fontSize={'1.4em'}>
                {text}
            </Typography>
        </Box>
    );
};

export default TypographyCombo;