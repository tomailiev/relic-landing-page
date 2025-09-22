import { useContext, useEffect, useRef } from "react";
import NotificationContext from "../../context/NotificationContext";

const CheckoutDialog = ({ eventId }) => {
  const containerRef = useRef(null);
  const { setNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (!window.EBWidgets) return;

    window.EBWidgets.createWidget({
      widgetType: "checkout",
      eventId,
      iframeContainerId: "eventbrite-widget-container",
      // iframeContainerHeight: 600,
      onOrderComplete: () => setNotification({ type: 'success', message: 'Thank you for your order!' }),
    });
  }, [eventId, setNotification]);

  return <div id="eventbrite-widget-container" ref={containerRef} />;
};
export default CheckoutDialog;