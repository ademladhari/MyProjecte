export const getStatusAddressForMap = (demande) => {
  switch (demande.Status) {
    case "en cours":
      return (
        demande.ArrivalGovernorate +
        "," +
        demande.ArrivalLocation +
        "," +
        demande.ArrivalAddress
      );
    case "affected":
      return (
        demande.DepartureGovernorate +
        "," +
        demande.DepartureLocation +
        "," +
        demande.DepartureAddress
      );
    case "delivered":
      return " delivered";
    case "canceled":
      return "Address for canceled";
    default:
      return "";
  }
};
export const getStatusAddress = (demande) => {
  switch (demande.Status) {
    case "en cours":
      return demande.ArrivalGovernorate + "," + demande.ArrivalLocation;
    case "affected":
      return demande.DepartureGovernorate + "," + demande.DepartureLocation;
    case "delivered":
      return " delivered";
    case "canceled":
      return "Address for canceled";
    default:
      return "";
  }
};
export const getStatusLabName = (demande) => {
  switch (demande.Status) {
    case "en cours":
      return demande.ArrivalLabName;
    case "affected":
      return demande.DepartureLabName;
    case "delivered":
      return " delivered";
    case "canceled":
      return "canceled";
    default:
      return "";
  }
};
