const SITE_URL =
  "https://horselservice.se";

export function getAbsoluteUrl(
  value
) {
  if (!value) {
    return null;
  }

  if (
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    return value;
  }

  return `${SITE_URL}${value}`;
}