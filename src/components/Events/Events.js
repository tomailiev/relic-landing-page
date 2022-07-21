import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import DialogContext from "../../context/DialogContext";

const Events = () => {

    const { setDialog } = useContext(DialogContext);

    return (
        <Box height={'500px'} display="flex" flexDirection="column" alignItems={"center"} justifyContent="center" textAlign={'center'} mx={2}>
            <Typography variant="h4">Inaugural week in Kalamazoo MI September 7-10, 2022</Typography>
            <Typography variant="h5">For more information <Button onClick={() => setDialog('subscription')}>Subscribe here</Button></Typography>
        </Box>
    );
};

export default Events;