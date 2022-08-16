import { Box, Button, TextField, Stack, Typography } from "@mui/material"
import { useContext, useState } from "react";
import NotificationContext from "../../context/NotificationContext";
import TextContext from "../../context/TextContext";
import { uploadDoc } from "../../utils/firebase/firestore-funcs";
import { emailSubSchema } from "../../utils/yup/schemas";

const SubscribeForm = () => {
    const { setNotification } = useContext(NotificationContext);
    const { text } = useContext(TextContext);
    const [userEmail, setUserEmail] = useState("");
    const [hasError, setHasError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleSubscribe(e) {
        e.preventDefault();
        setIsSubmitting(true);
        emailSubSchema.validate({ email: userEmail })
            .then(val => uploadDoc(val, 'subscribers'))
            .then(() => {
                setUserEmail('');
                setIsSubmitting(false);
                setNotification({ type: 'success', message: 'Thank you for subscribing!' });
            })
            .catch(e => {
                setIsSubmitting(false);
                e.name === 'ValidationError'
                    ? setHasError(true)
                    : console.log(e.errors);
            });
    }

    function handleInputChange(e) {
        setUserEmail(e.target.value)
    }


    return (
        <Box flex={1} sx={{ p: 10 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                {text.subscribeTitle || 'Subscribe to our list!'}
            </Typography>
            <form onSubmit={handleSubscribe}>
                <Stack spacing={2}>
                    <TextField
                        error={hasError}
                        value={userEmail}
                        onFocus={() => setHasError(false)}
                        onChange={handleInputChange}
                        helperText={hasError && "Valid email is required"}
                        label="Your Email"
                        variant="outlined"
                        size="small"
                    />
                    <Button
                        variant="outlined"
                        color="primary"
                        disabled={isSubmitting}
                        type="submit"
                    >
                        Subscribe
                    </Button>
                </Stack>
            </form>
        </Box>
    )
};

export default SubscribeForm;