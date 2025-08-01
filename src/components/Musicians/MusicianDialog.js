import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const MusicianDialog = ({ src, name, bio }) => {
    const arr = bio.includes(name) ? bio.split(name) : [bio];

    return (
        <>
            <Box display={'flex'} justifyContent={'center'} sx={{ px: { xs: 0, sm: 3 } }}>
                <img src={src} height="auto" width="88%" alt={name} style={{ borderRadius: 3 }} />
            </Box>
            <Box sx={{ px: { xs: 1, sm: 3 } }}>
                <Typography sx={{ m: { xs: 1, sm: 4 } }}>
                    {arr[0]}
                    <Typography component={'span'} fontSize={18} fontWeight="700" >{name}</Typography>
                    {arr[1]}
                </Typography>
            </Box>
        </>
    );
};

export default MusicianDialog;