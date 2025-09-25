import getPopupType from "./getPopupType";

export default function updateRouteState(newRoute) {
  window.setCurrentRoute(newRoute);

  let popupType = getPopupType(newRoute);

  if (!popupType) {
    window.setNonPopupRoute(newRoute);
  }
}
