import { useContext, useEffect, useRef, useState } from "react";
import NotificationContext from "../../context/NotificationContext";
import { Box, Link, Skeleton, Typography } from "@mui/material";

const CheckoutDialog = ({ url }) => {
  const containerRef = useRef(null);
  const { setNotification } = useContext(NotificationContext);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const eventId = url.includes('?') ? url.substring(url.lastIndexOf('tickets-') + 8, url.indexOf('?')) : url.substring(url.lastIndexOf('tickets-') + 8);

  useEffect(() => {
    if (!window.EBWidgets) return;
    window.EBWidgets.createWidget({
      widgetType: "checkout",
      eventId,
      iframeContainerId: "eventbrite-widget-container",
      iframeContainerHeight: 600,
      onOrderComplete: () => setNotification({ type: 'success', message: 'Thank you for your order!' }),
    });

    function handler(event) {

      if (event.origin === 'https://www.eventbrite.com' || event.origin === 'https://eventbrite.com') {
        setIframeLoaded(true);
        console.log(event.data);

        if (event.data.type === 'checkout-loaded') {
          console.log('Eventbrite iframe is fully loaded!');
        }

      }
      console.log(event.origin);

    }
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);

  }, [eventId, setNotification]);

  return <Box>
    <div id="eventbrite-widget-container" ref={containerRef} />
    {!iframeLoaded && <Box pt={3}>
      <Skeleton variant="rectangular" height={'30px'} width={'100%'} />
      <Skeleton variant="rectangular" width={'100%'} height={'350px'} sx={{ my: 2 }} />
      <Typography variant="body2" sx={{mb: 2}}>Form not loading? <Link href={url} target={'_blank'} referrerPolicy="no-referrer">Click here.</Link></Typography>
    </Box>
    }
  </Box>;
};
export default CheckoutDialog;