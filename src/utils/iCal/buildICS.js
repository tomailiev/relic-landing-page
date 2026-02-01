import { escapeICalText } from "./escapeICalText";

export function buildICS(event, perf) {
  const uid = `${perf._uid}@relicensemble.org`;
  const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Relic Ensemble//Event Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${perf.start_utc_compact}`,
    `DTEND:${perf.end_utc_compact}`,
    `SUMMARY:${escapeICalText("Relic: " + event.title)}`,
    `DESCRIPTION:${escapeICalText(event.description || "")}`,
    `LOCATION:${escapeICalText(perf.calendar_location)}`,
    performance.url
      ? `URL:${escapeICalText(performance.url)}`
      : null,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
