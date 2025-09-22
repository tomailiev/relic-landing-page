import { useContext, useEffect, useRef } from "react";
import NotificationContext from "../../context/NotificationContext";
import LoadingContext from "../../context/LoadingContext";

const CheckoutDialog = ({ eventId }) => {
  const containerRef = useRef(null);
  const { setNotification } = useContext(NotificationContext);
  const {setLoading} = useContext(LoadingContext);

  useEffect(() => {
    if (!window.EBWidgets) return;
    setLoading(true);
    window.EBWidgets.createWidget({
      widgetType: "checkout",
      eventId,
      iframeContainerId: "eventbrite-widget-container",
      iframeContainerHeight: 700,
      onOrderComplete: () => setNotification({ type: 'success', message: 'Thank you for your order!' }),
    });

    const container = document.getElementById("eventbrite-widget-container");
    const observer = new MutationObserver(() => {
      const iframe = container.querySelector("iframe");
      if (iframe) {
        iframe.addEventListener("load", () => {
          setLoading(false);
          console.log("Eventbrite widget iframe loaded");
        });
        iframe.addEventListener('', () => {
          setLoading(false);
          console.log('iframe errored out');

        })
        observer.disconnect();
      }
    });

    observer.observe(container, { childList: true });

    return () => observer.disconnect();
  }, [eventId, setNotification, setLoading]);

  return <div id="eventbrite-widget-container" ref={containerRef} />;
};
export default CheckoutDialog;