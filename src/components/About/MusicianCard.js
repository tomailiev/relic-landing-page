import { Card, CardActionArea, CardContent, CardMedia, Skeleton, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import DialogContext from "../../context/DialogContext";
import { getLink } from "../../utils/firebase/firestore-funcs";

const MusicianCard = ({ name, picUrl, bio, title }) => {

    const { setDialog } = useContext(DialogContext);
    const [src, setSrc] = useState(null);
    const [imgLoaded, setImgLoaded] = useState(false);

    // const greyToColor = {
    //     '-webkit-transition': '.3s ease-in-out',
    //     '-moz-filter': 'rayscale(100%)',
    //     '-moz-transition': '.3s ease-in-out',
    //     '-o-filter': 'grayscale(100%)',
    //     '-o-transition': '.3s ease-in-out',
    //     '-webkit-filter': 'grayscale(100%)',
    //     '&:hover': {
    //         '-webkit-filter': 'grayscale(0%)',
    //         '-webkit-transition': '.3s ease-in-out',
    //         '-moz-filter': 'grayscale(0%)',
    //         '-moz-transition': '.3s ease-in-out',
    //         '-o-filter': 'grayscale(0%)',
    //         '-o-transition': '.3s ease-in-out',
    //     }
    // }

    function addBoldToBio(bio = "") {
        const arr = bio.split(name);
        const span = (<Typography component={'span'} fontSize={18} fontWeight="700" >{name}</Typography>);
        return [arr[0], span, arr[1]];
    }

    useEffect(() => {
        getLink(picUrl)
            .then(val => setSrc(val))
            .catch(console.error);
    }, [picUrl]);

    return (
        <Card>
            <CardActionArea onClick={() => setDialog(addBoldToBio(bio))}>
                <div style={{ height: 400, display: 'flex', justifyContent: 'center', background: '#d7d4cf' }}>
                    {!imgLoaded && <Skeleton variant="rectangular" height={400} width={'100%'} />}
                    <CardMedia
                        component="img"
                        // height="300"
                        width={'auto'}
                        image={src}
                        alt="musician picture"
                        sx={!imgLoaded ? { width: 0, height: 0 } : { width: 'auto', maxHeight: '100%' }}
                        onLoad={() => setImgLoaded(true)}
                    />
                </div>
                <CardContent>
                    <Typography variant="h5">
                        {imgLoaded ? name : <Skeleton />}
                    </Typography>
                    <Typography variant="body1">
                        {imgLoaded ? title : <Skeleton />}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default MusicianCard;