import { Typography } from "@mui/material";

const TypographyCombo = ({ title, text }) => {

    return (
        <>
            <Typography variant="h6">
                {title}
            </Typography>
            <Typography mb={3}>
                {text}
            </Typography>
        </>
    );
};

export default TypographyCombo;