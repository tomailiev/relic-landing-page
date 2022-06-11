import { Link, Typography } from "@mui/material";

const Copyright = () => {
    const year = new Date().getFullYear();

    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://relicensemble.org">
                Relic Ensemble
            </Link>{' '}
            {year}
            {'.'}
        </Typography>
    );
};

export default Copyright;

