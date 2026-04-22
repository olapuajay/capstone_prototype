const EARTH_RADIUS_KM = 6371;

const toRadians = (degrees) => (degrees * Math.PI) / 180;

export const calculateDistanceKm = (start, end) => {
  const dLat = toRadians(end.lat - start.lat);
  const dLng = toRadians(end.lng - start.lng);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(start.lat)) *
      Math.cos(toRadians(end.lat)) *
      Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * c;
};

export const calculateEtaMinutes = (start, end, speedKmph) => {
  if (!speedKmph || speedKmph <= 0) {
    return null;
  }

  const distanceKm = calculateDistanceKm(start, end);
  const timeHours = distanceKm / speedKmph;

  return Math.max(1, Math.round(timeHours * 60));
};
