import { useContext, useEffect, useRef } from "react";
import NotificationContext from "../../context/NotificationContext";
import LoadingContext from "../../context/LoadingContext";

const CheckoutDialog = ({ eventId }) => {
  const containerRef = useRef(null);
  const { setNotification } = useContext(NotificationContext);
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (!window.EBWidgets) return;
    setLoading(true);
    window.EBWidgets.createWidget({
      widgetType: "checkout",
      eventId,
      iframeContainerId: "eventbrite-widget-container",
      iframeContainerHeight: 600,
      onOrderComplete: () => setNotification({ type: 'success', message: 'Thank you for your order!' }),
    });
    function handler(event) {

      if (event.origin === 'https://www.eventbrite.com' || event.origin === 'https://eventbrite.com') {
        if (event.data.type === 'checkout-loaded') {
          console.log('Eventbrite iframe is fully loaded!');
          setLoading(false);
        }
        console.log(event.data.type);
        
      }
      console.log(event.origin);
      
      setLoading(false);
    }
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);

  }, [eventId, setNotification, setLoading]);

  return <div id="eventbrite-widget-container" ref={containerRef} />;
};
export default CheckoutDialog;