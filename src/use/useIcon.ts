/**
 * Determines and returns weather icon based on passed weather ID
 * - 200 - 232 = Thunderstorm
 * - 300 - 321 = Drizzle
 * - 500 - 531 = Rain
 * - 600 - 622 = Snow
 * - 700 - 781 = Smog / Haze (Note: 781 is Tornado)
 * - 800       = Clear
 * - 801 - 804 = Clouds
 * @param id Weather ID
 * @returns {string} Fontawesome icon class
 */
const useIcon = (id: number | string) => {
  let tempId = id;

  if (typeof id === "string") {
    tempId = parseInt(id);
  }
  if (tempId >= 200 && tempId <= 232) {
    return "fa-cloud-bolt";
  } else if (tempId >= 300 && tempId <= 321) {
    return "fa-cloud-rain";
  } else if (tempId >= 500 && tempId <= 531) {
    return "fa-cloud-showers-heavy";
  } else if (tempId >= 600 && tempId <= 622) {
    return "fa-snowflake";
  } else if (tempId >= 700 && tempId <= 781) {
    return "fa-smog";
  } else if (tempId === 800) {
    return "fa-sun";
  } else if (tempId >= 801 && tempId <= 804) {
    return "fa-cloud";
  } else {
    return "Failed to find icon";
  }
};

export default useIcon;
