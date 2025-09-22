import { useEffect, useRef } from "react";
import useEventbriteScript from "../../hooks/useEventbriteScript";

const  CheckoutDialog = ({ eventId }) => {
  const containerRef = useRef(null);

  useEventbriteScript();

  useEffect(() => {
    if (!window.EBWidgets) return;

    window.EBWidgets.createWidget({
      widgetType: "checkout",
      eventId,
      iframeContainerId: "eventbrite-widget-container",
      iframeContainerHeight: 600,
      onOrderComplete: () => console.log("Order complete!"),
    });
  }, [eventId]);

  return <div id="eventbrite-widget-container" ref={containerRef} />;
};
export default CheckoutDialog;