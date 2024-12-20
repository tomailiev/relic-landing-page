import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const MusicianDialog = ({ src, name, bio }) => {
    const arr = bio.split(name);

    return (
        <>
            <Box display={'flex'} justifyContent={'center'} >
                <img src={src} height="auto" width="88%" alt={name} style={{borderRadius: 3}} />
            </Box>
            <Box>
                <Typography m={4}>
                    {arr[0]}
                    <Typography component={'span'} fontSize={18} fontWeight="700" >{name}</Typography>
                    {arr[1]}
                </Typography>
            </Box>
        </>
    );
};

export default MusicianDialog;