import { Box, Link, Typography } from "@mui/material";

const Copyright = () => {
    const year = new Date().getFullYear();

    return (
        <Box sx={{mb: 3}}>
            <Typography variant="body2" color="secondary" align="center" paddingBottom={2}>
                {'Copyright © '}
                <Link color="inherit" href="https://relicensemble.org">
                    Relic
                </Link>{' '}
                {year}
                {'.'}
            </Typography>
        </Box>
    );
};

export default Copyright;

