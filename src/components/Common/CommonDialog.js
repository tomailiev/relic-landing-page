import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useContext } from "react";
import DialogContext from "../../context/DialogContext";
import { links } from '../../data/links'
import CloseIcon from '@mui/icons-material/Close';

const CommonDialog = () => {

    const { dialog, setDialog } = useContext(DialogContext);

    return (
        <Dialog
            fullWidth={true}
            maxWidth={dialog?.type === 'donation' ? 'lg' : 'sm'}
            open={!!dialog}
            onClose={() => setDialog(null)}
        >
            <DialogTitle sx={{ mx: 2 }}>
                {dialog?.title}
                <IconButton
                    aria-label="close"
                    onClick={() => setDialog(null)}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers={!(dialog?.type === 'subscription')}>
            {dialog?.type === 'donation'
                ? <iframe title="donation-frame" className="iframe-class" src={links.gems} width="100%" height={'600px'} frameborder="0" scrolling="auto" marginheight="0" marginwidth="0" allowtransparency="true" onLoad={(e) => e.target.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })}></iframe>
                : dialog?.component
            }
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => setDialog(null)}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CommonDialog;