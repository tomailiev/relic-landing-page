import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Events = () => {

    return (
            <Box height={'500px'} display="flex" flexDirection="column" alignItems={"center"} justifyContent="center" textAlign={'center'} mx={2}>
                <Typography variant="h4">Inaugural week in Kalamazoo MI September 7-10, 2022</Typography>
                <Typography variant="h5">For more information Subscribe at our <Link to={'/'}>homepage</Link></Typography>
            </Box>
    );
};

export default Events;