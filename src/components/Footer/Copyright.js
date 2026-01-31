import { Box, Typography } from "@mui/material";

const Copyright = () => {
    const year = new Date().getFullYear();

    return (
        <Box sx={{mb: 1}}>
            <Typography variant="body2" color="secondary" align="center" paddingBottom={2}>
                 © Relic {year}
            </Typography>
        </Box>
    );
};

export default Copyright;

