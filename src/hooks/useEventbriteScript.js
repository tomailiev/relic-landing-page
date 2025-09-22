import { useEffect } from "react";

export default function useEventbriteScript() {
  useEffect(() => {
    if (document.getElementById("eventbrite-script")) return; // don’t load twice

    const script = document.createElement("script");
    script.id = "eventbrite-script";
    script.src = "https://www.eventbrite.com/static/widgets/eb_widgets.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
}
