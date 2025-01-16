import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import pdfFile from '../../assets/The_Dawn_of_Time_DC_1.2025_program_book.pdf'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const ProgramDialog = () => {

    const file = useMemo(() => pdfFile, []);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [showPages, setShowPages] = useState(true);

    function onDocumentLoadSuccess({ numPages }) {
        console.log('loaded pdf');

        setNumberOfPages(numPages);
    }

    return (
        <Box minHeight={'510px'} position={'relative'} display={'flex'} flexDirection={'row'} flexGrow={1} justifyContent={'center'} onMouseOver={() => setShowPages(true)} onMouseOut={() => setShowPages(false)}>
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} height={510} />
            </Document>
            {showPages && <Paper elevation={5} sx={{ position: 'absolute', left: '50%', bottom: '5%', transform: 'translate(-50%, 0);', zIndex: 100, minWidth: '177px' }}>
                <Stack direction={'row'} display={'flex'} justifyContent={'space-between'}>
                    <IconButton onClick={() => setPageNumber(prev => prev - 1 || 1)}>
                        <ArrowLeft />
                    </IconButton>
                    <Typography mt={1}>
                        Page {pageNumber} of {numberOfPages}
                    </Typography>
                    <IconButton onClick={() => setPageNumber(prev => pageNumber === numberOfPages ? 1 : prev + 1)}>
                        <ArrowRight />
                    </IconButton>
                </Stack>

            </Paper>}
        </Box>
    );
};

export default ProgramDialog;