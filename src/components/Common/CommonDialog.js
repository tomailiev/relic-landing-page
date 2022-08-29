import { Button, Dialog, DialogActions, DialogTitle, IconButton, Typography } from "@mui/material";
import { useContext } from "react";
import DialogContext from "../../context/DialogContext";
import { links } from '../../data/links'
import SubscribeForm from "./SubscribeForm";
import CloseIcon from '@mui/icons-material/Close';

const CommonDialog = () => {

    const { dialog, setDialog } = useContext(DialogContext);

    return (
        <Dialog
            fullWidth={true}
            maxWidth={dialog === 'donation' ? 'lg' : 'sm'}
            open={!!dialog}
            onClose={() => setDialog(null)}
        >
            <DialogTitle sx={{ m: 0, p: 2 }}>
                <IconButton
                    aria-label="close"
                    onClick={()=> setDialog(null)}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            {dialog === 'donation'
                ? <iframe height={'1000px'} title="Donation frame" src={links.gems}></iframe>
                : dialog === 'subscription'
                    ? <SubscribeForm />
                    : <Typography key={dialog} m={4}>{dialog}</Typography>
            }
            <DialogActions>
                <Button variant="contained" onClick={() => setDialog(null)}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CommonDialog;