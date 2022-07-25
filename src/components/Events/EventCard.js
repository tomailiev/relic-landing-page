import { Card, CardActionArea, CardMedia } from "@mui/material";
import klmzImg from '../../assets/banners/banner_square.webp';

const EventCard = () => {
    return (
        <Card raised sx={{maxWidth: 400, maxHeight: 400}}>
            <CardActionArea>
                <div style={{ display: 'flex', justifyContent: 'center', background: '#d7d4cf' }}>
                    <CardMedia
                        component="img"
                        // height="300"
                        width={'auto'}
                        image={klmzImg}
                        alt="green iguana"
                        sx={{ width: '100%', maxHeight: '100%' }}
                    />
                </div>
            </CardActionArea>
        </Card>
    )
};
export default EventCard;