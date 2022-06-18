import { Alert, Snackbar } from "@mui/material";
import { useContext } from "react";
import NotificationContext from "../../context/NotificationContext";

const Notification = () => {
    const { notification, setNotification } = useContext(NotificationContext);

    return (
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={!!notification} autoHideDuration={3000} onClose={() => setNotification(null)}>
            <Alert severity={notification?.type}>{notification?.message}</Alert>
        </Snackbar>
    );
};

export default Notification;