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
    function handler() {

      setLoading(false);
    }
    const iframe = document.querySelector("#eventbrite-widget-container iframe");
    iframe.addEventListener('load', handler);
    iframe.addEventListener('error', handler);
    return [iframe.removeEventListener('load', handler), iframe.removeEventListener('error', handler)];

  }, [eventId, setNotification, setLoading]);

  return <div id="eventbrite-widget-container" ref={containerRef} />;
};
export default CheckoutDialog;