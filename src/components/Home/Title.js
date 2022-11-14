import {  Typography } from "@mui/material";
import { useContext } from "react";
// import logo from "../../assets/logos/relic-logo-red-256.png";
import TextContext from "../../context/TextContext";

const Title = () => {

    const { text } = useContext(TextContext);

    return (
        <Typography
            maxWidth={'100%'}
            textAlign={'center'}
            variant="h1"
            mt={'85px'}
            mx={1}
            color={'white'}
            zIndex={200}
            sx={{ position: 'absolute', left: '50%', top: '60%', transform: 'translate(-50%, -50%)', textShadow: '1px 1px black, -1px -1px black', opacity: 1 }}
        >
            {text.siteHeading || 'RELIC'}
        </Typography>
    )
};

export default Title;