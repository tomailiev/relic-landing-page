import {  Typography } from "@mui/material";
import logo from "../../assets/logos/Relic-logo_white.png";

const Title = () => {

    // const { text } = useContext(TextContext);

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
            {/* {text.siteHeading || 'RELIC'} */}
            <img width={'80%'} src={logo} alt={'logo'} />
        </Typography>
    )
};

export default Title;