import { useContext, useEffect, useRef, useState } from "react";
import NotificationContext from "../../context/NotificationContext";
import { Box, Skeleton } from "@mui/material";

const CheckoutDialog = ({ eventId }) => {
  const containerRef = useRef(null);
  const { setNotification } = useContext(NotificationContext);
  const [iframeLoaded, setIframeLoaded] = useState(false);

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

  return iframeLoaded
    ? <div id="eventbrite-widget-container" ref={containerRef} />
    : <Box pt={3}>
      <Skeleton variant="rectangular" height={'30px'} width={'100%'} />
      <Skeleton width={'100%'} height={'300px'} />
    </Box>;
};
export default CheckoutDialog;