import { Box, Button, TextField, Stack, Typography } from "@mui/material"
import { useState } from "react";
import uploadDoc from "../utils/firebase/firestore-funcs";

const SubscribeForm = () => {
    const [userEmail, setUserEmail] = useState("");
    const [hasError, setHasError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleSubscribe(e) {
        e.preventDefault();
        if (!userEmail) {
            setHasError(true);
            return;
        }
        setIsSubmitting(true);
        uploadDoc({ email: userEmail }, "testEmail")
            .then(() => {
                setUserEmail("");
                setIsSubmitting(false);
            })
    }

    function handleInputChange(e) {
        setUserEmail(e.target.value)
    }


    return (
        <Box flex={1} sx={{ m: 3 }}>
            <Typography variant="h5">
                Subscribe to our emails!
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