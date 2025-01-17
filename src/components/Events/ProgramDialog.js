import { Box, Fade, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

const ProgramDialog = ({ file }) => {

    const [numberOfPages, setNumberOfPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [showPages, setShowPages] = useState(true);
    const [pdfHeight, setPdfHeight] = useState(0);
    const boxRef = useRef(null);

    useEffect(() => {
        if (boxRef.current) {
            setPdfHeight(boxRef.current.offsetHeight / boxRef.current.offsetWidth > 1.75
                ? boxRef.current.offsetWidth * 1.75
                : boxRef.current.offsetHeight);
        }
    }, [boxRef.current?.offsetHeight]);

    useEffect(() => {
        setTimeout(() => {
            setShowPages(false)
        }, 3000);

    }, [])


    function onDocumentLoadSuccess({ numPages }) {

        setNumberOfPages(numPages);
    }

    return (
        <Box
            ref={boxRef}
            minHeight={'549px'}
            height={'100%'}
            position={'relative'}
            display={'flex'}
            flexDirection={'row'}
            flexGrow={1}
            justifyContent={'center'}
            justifyItems={'center'}
            onMouseOver={() => setShowPages(true)}
            onMouseOut={() => setShowPages(false)}
        >
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} height={pdfHeight} />
            </Document>
            {
                numberOfPages && showPages && <Fade in={!!showPages} easing={'ease-out'}>
                    <Paper elevation={5} sx={{ position: 'absolute', left: '50%', bottom: '5%', transform: 'translate(-50%, 0);', zIndex: 100, minWidth: '177px' }}>
                        <Stack direction={'row'} display={'flex'} justifyContent={'space-between'}>
                            <IconButton onClick={() => setPageNumber(prev => prev - 1)} disabled={pageNumber === 1}>
                                <ArrowLeft />
                            </IconButton>
                            <Typography mt={1}>
                                Page {pageNumber} of {numberOfPages}
                            </Typography>
                            <IconButton onClick={() => setPageNumber(prev => prev + 1)} disabled={pageNumber === numberOfPages}>
                                <ArrowRight />
                            </IconButton>
                        </Stack>

                    </Paper>
                </Fade>
            }
        </Box >
    );
};

export default ProgramDialog;