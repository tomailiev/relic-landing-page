import { Box, Link, Typography } from "@mui/material";

const Copyright = () => {
    const year = new Date().getFullYear();

    return (
        <Box sx={{mb: 3}}>
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://relicensemble.org">
                    Relic Ensemble
                </Link>{' '}
                {year}
                {'.'}
            </Typography>
        </Box>
    );
};

export default Copyright;

