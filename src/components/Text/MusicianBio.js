import { Typography } from "@mui/material";

const MusicianBio = ({ bio, name }) => {

    function addBoldToBio(bio = "") {
        const arr = bio.split(name);
        const span = (<Typography component={'span'} fontSize={18} fontWeight="700" >{name}</Typography>);
        return [arr[0], span, arr[1]];
    }

    return (
        <Typography component={'span'} fontSize={18}>
            {addBoldToBio(bio).map((item, idx) => <span key={idx}>{item}</span>)}
        </Typography>
    );
};

export default MusicianBio;