import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import DialogContext from "../../context/DialogContext";
import CloseIcon from '@mui/icons-material/Close';
import { Fullscreen, FullscreenExit } from "@mui/icons-material";

const CommonDialog = () => {

    const { dialog, setDialog } = useContext(DialogContext);
    const [hasContent, setHasContent] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const theme = useTheme();
    const smMatch = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        setHasContent(!!dialog)
    }, [dialog])

    function closeDialog() {
        setHasContent(false);
        setTimeout(() => {
            setIsFullScreen(false);
            setDialog(null);
        }, 200);
    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth={dialog?.type === 'donation' || dialog?.type === 'photo' ? 'lg' : 'sm'}
            open={hasContent}
            onClose={closeDialog}
            fullScreen={isFullScreen || ((dialog?.type === 'program' || dialog?.type === 'donation' || dialog?.type === 'video' || dialog?.type === 'photo') && smMatch)}
            sx={{ my: 0 }}
        >
            <DialogTitle sx={{ mr: 4 }}>
                <Typography noWrap={true}>{dialog?.title}</Typography>
                {((dialog?.type === 'program' || dialog?.type === 'donation') && !smMatch) && (isFullScreen
                    ? <IconButton
                        aria-label="expand"
                        onClick={() => setIsFullScreen(prev => !prev)}
                        sx={{
                            position: 'absolute',
                            right: 48,
                            top: 8,
                        }}
                    >
                        <FullscreenExit />
                    </IconButton>
                    : <IconButton
                        aria-label="expand"
                        onClick={() => setIsFullScreen(prev => !prev)}
                        sx={{
                            position: 'absolute',
                            right: 48,
                            top: 8,
                        }}
                    >
                        <Fullscreen />
                    </IconButton>)}
                <IconButton
                    aria-label="close"
                    onClick={closeDialog}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers={!(dialog?.type === 'subscription')} sx={{ p: 0 }}>
                {dialog?.component}
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={closeDialog}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CommonDialog;