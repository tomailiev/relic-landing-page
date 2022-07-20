import { Button, Dialog, DialogActions } from "@mui/material";
import { useContext } from "react";
import DialogContext from "../../context/DialogContext";
import { links } from '../../data/links'
import SubscribeForm from "../Home.js/SubscribeForm";

const CommonDialog = () => {

    const { dialog, setDialog } = useContext(DialogContext);

    return (
        <Dialog
            fullWidth={true}
            maxWidth={dialog === 'donation' ? 'lg' : 'md'}
            open={!!dialog}
            onClose={() => setDialog(null)}
        >
            {dialog === 'donation'
                ? <iframe height={'1000px'} title="Donation frame" src={links.gems}></iframe>
                : <SubscribeForm />
            }
            <DialogActions>
                <Button onClick={() => setDialog(null)}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CommonDialog;