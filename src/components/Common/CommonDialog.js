import { Button, Dialog, DialogActions, Typography } from "@mui/material";
import { useContext } from "react";
import DialogContext from "../../context/DialogContext";
import { links } from '../../data/links'
import SubscribeForm from "./SubscribeForm";

const CommonDialog = () => {

    const { dialog, setDialog } = useContext(DialogContext);

    return (
        <Dialog
            fullWidth={true}
            maxWidth={dialog === 'donation' ? 'lg' : 'sm'}
            open={!!dialog}
            onClose={() => setDialog(null)}
        >
            {dialog === 'donation'
                ? <iframe height={'1000px'} title="Donation frame" src={links.gems}></iframe>
                : dialog === 'subscription'
                    ? <SubscribeForm />
                    : <Typography m={4}>{dialog}</Typography>
            }
            <DialogActions>
                <Button onClick={() => setDialog(null)}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CommonDialog;