import { Card, CardActionArea, CardContent, CardMedia, Skeleton, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import DialogContext from "../../context/DialogContext";
import { getLink } from "../../utils/firebase/firestore-funcs";

const MusicianCard = ({ name, picUrl, bio, title }) => {

    const { setDialog } = useContext(DialogContext);
    const [src, setSrc] = useState(null);
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgStyle, setImgStyle] = useState({ width: 0, height: 0 });


    function addBoldToBio(bio = "") {
        const arr = bio.split(name);
        const span = (<Typography component={'span'} fontSize={18} fontWeight="700" >{name}</Typography>);
        return [arr[0], span, arr[1]];
    }

    function handleImgLoad() {
        setImgLoaded(true);
        setImgStyle({width: 'auto', height: '100%'})
    }
    function handleMouseOver() {
        setImgStyle({width: 'auto', height: '110%', transition: 'height 300ms ease-out'})
    }

    function handleMouseOut() {
        setImgStyle({width: 'auto', height: '100%', transition: 'height 300ms ease-out'})
    }

    useEffect(() => {
        getLink(picUrl)
            .then(val => setSrc(val))
            .catch(console.error);
    }, [picUrl]);

    return (
        <Card>
            <CardActionArea onClick={() => setDialog(addBoldToBio(bio))}>
                <div style={{ height: 400, display: 'flex', justifyContent: 'center', background: '#d7d4cf', overflow: 'hidden' }}>
                    {!imgLoaded && <Skeleton variant="rectangular" height={400} width={'100%'} />}
                    <CardMedia
                        component="img"
                        // height="300"
                        width={'auto'}
                        image={src}
                        loading='lazy'
                        alt="musician picture"
                        sx={imgStyle}
                        onLoad={handleImgLoad}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
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