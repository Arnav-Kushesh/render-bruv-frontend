export default function getGpsLocationWeb(callback) {
  if (!navigator.geolocation) {
    window.popupAlert("Geolocation is not supported by your browser");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      callback({ latitude, longitude });

      // Open in Google Maps
    },
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("Permission denied. Please allow location access.");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          alert("Location request timed out.");
          break;
        default:
          alert("An unknown error occurred.");
          break;
      }
    }
  );
}
