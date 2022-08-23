import { Backdrop, CircularProgress } from "@mui/material";
import { useContext } from "react";
import LoadingContext from "../../context/LoadingContext";

const LoadingBackdrop = () => {

    const {loading} = useContext(LoadingContext);

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: 1101 }}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default LoadingBackdrop;