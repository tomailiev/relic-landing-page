import { Typography } from "@mui/material";

const TypographyCombo = ({ title, text }) => {

    return (
        <>
            <Typography variant="h6" fontSize={'1.2em'}>
                {title}
            </Typography>
            <Typography mb={3} fontSize={'1.2em'}>
                {text}
            </Typography>
        </>
    );
};

export default TypographyCombo;