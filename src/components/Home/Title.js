import { Typography } from "@mui/material";
import { logos } from '../../data/images';

const Title = () => {

    // const { text } = useContext(TextContext);

    return (
        <Typography
            maxWidth={'75%'}
            // maxHeight={'100%'}
            textAlign={'center'}
            variant="h1"
            // mt={'85px'}
            // mx={1}
            width={450}
            color={'white'}
            zIndex={200}
            sx={{
                position: 'absolute',
                left: '50%',
                top: '60%',
                transform: 'translate(-50%, -50%)',
                textShadow: '2px 2px black, -2px -2px black',
                opacity: 1
            }}
        >
            {/* {text.siteHeading || 'RELIC'} */}
                <img width={'100%'} src={logos.logo_white} alt={'Relic Ensemble'} />
        </Typography>
    )
};

export default Title;