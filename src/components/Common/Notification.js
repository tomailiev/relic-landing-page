import { Alert, Snackbar } from "@mui/material";
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import { useContext } from "react";
import NotificationContext from "../../context/NotificationContext";

const Notification = () => {
    const { notification, setNotification } = useContext(NotificationContext);

    return (
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={!!notification} autoHideDuration={4500} onClose={() => setNotification(null)}>
            <Alert icon={<DoneOutlinedIcon />} severity={notification?.type}>{notification?.message}</Alert>
        </Snackbar>
    );
};

export default Notification;