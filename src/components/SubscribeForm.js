import { Box, Button, TextField, Stack, Typography } from "@mui/material"
import { useState } from "react";
import uploadDoc from "../utils/firebase/firestore-funcs";

const SubscribeForm = () => {
    const [userEmail, setUserEmail] = useState("");
    const [hasError, setHasError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleSubscribe(e) {
        if (!userEmail) {
            setHasError(true);
            return;
        }
        setIsSubmitting(true);
        e.preventDefault();
        uploadDoc({email: userEmail}, "testEmail")
            .then(() => {
                setUserEmail("");
                setIsSubmitting(false);
            })
    }

    function handleInputChange(e) {
        setUserEmail(e.target.value)
    }


    return (
        <Box flex={1} sx={{m: 3}}>
            <Stack spacing={2}>
            <Typography variant="h5">
                Subscribe to our emails!
            </Typography>
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
                    onClick={handleSubscribe}
                    disabled={isSubmitting}
                >
                    Subscribe
                </Button>
            </Stack>
        </Box>
    )
};

export default SubscribeForm;