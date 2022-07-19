import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"

const DonationDialog = ({ open, setOpen }) => {
    return (
        <Dialog
            fullWidth={true}
            maxWidth={'lg'}
            open={open}
            onClose={() => setOpen(false)}
        >
            <iframe height={'1000px'} src="https://ci.ovationtix.com/35560/store/donations/47953"></iframe>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DonationDialog;