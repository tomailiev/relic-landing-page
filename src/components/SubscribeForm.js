import { Box, Button, TextField, Stack } from "@mui/material"
import { useState } from "react";

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
        setTimeout(() => setIsSubmitting(false), 1000);
        e.preventDefault();
        console.log(userEmail);
        setUserEmail("");
    }

    function handleInputChange(e) {
        setUserEmail(e.target.value)
    }


    return (
        <Box flex={1} sx={{ width: 200, m: 3 }}>
            <Stack spacing={1}>
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