import { Card, CardActionArea, CardMedia } from "@mui/material"
import founderPic from '../../assets/imgs/IMG_3970.webp';

const MusicianCard = () => {
    return (
        <Card sx={{m: 3}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="300"
                    image={founderPic}
                    alt="green iguana"
                />
            </CardActionArea>
        </Card>
    );
};

export default MusicianCard;