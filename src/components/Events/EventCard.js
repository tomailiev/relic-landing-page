import { Card, CardActionArea, CardMedia, Skeleton } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { getLink } from "../../utils/firebase/firestore-funcs";

const EventCard = ({ imageUrl }) => {

    const [src, setSrc] = useState(null);

    useEffect(() => {
        getLink(imageUrl)
            .then(val => setSrc(val))
            .catch(console.error);
    }, [imageUrl]);

    return (
        <Card raised sx={{ maxWidth: 400, maxHeight: 400 }}>
            <CardActionArea>
                <div style={{ display: 'flex', justifyContent: 'center', background: '#d7d4cf' }}>
                    {src
                        ? <CardMedia
                            component="img"
                            // height="300"
                            width={'auto'}
                            image={src}
                            alt="event image"
                            sx={{ width: '100%', maxHeight: '100%' }}
                        />
                        : <Skeleton variant="rectangular" height={'400px'} width={'400px'} />
                    }
                </div>
            </CardActionArea>
        </Card>
    )
};
export default EventCard;