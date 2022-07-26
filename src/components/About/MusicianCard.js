import { Card, CardActionArea, CardContent, CardMedia, Skeleton, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import DialogContext from "../../context/DialogContext";
import { getLink } from "../../utils/firebase/firestore-funcs";

const MusicianCard = ({ name, picUrl, bio, title }) => {

    const { setDialog } = useContext(DialogContext);
    const [src, setSrc] = useState(null);

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
                    {
                        src
                            ? <CardMedia
                                component="img"
                                // height="300"
                                width={'auto'}
                                image={src}
                                alt="musician picture"
                                sx={{ width: 'auto', maxHeight: '100%' }}
                            />
                            : <Skeleton variant="rectangular" height={400} width={'100%'} />
                    }
                </div>
                <CardContent>
                    <Typography variant="h5">
                        {name}
                    </Typography>
                    <Typography variant="body1">
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default MusicianCard;