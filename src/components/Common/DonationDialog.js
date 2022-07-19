import { Button, Dialog, DialogActions } from "@mui/material";
import { links } from '../../data/links'

const DonationDialog = ({ open, setOpen }) => {

    return (
        <Dialog
            fullWidth={true}
            maxWidth={'lg'}
            open={open}
            onClose={() => setOpen(false)}
        >
            <iframe height={'1000px'} title="Donation frame" src={links.gems}></iframe>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DonationDialog;