export const getStatusAddressForMap = (demande) => {
  switch (demande.Status) {
    case "collecté":
      return (
        demande.ArrivalGovernorate +
        "," +
        demande.ArrivalCity +
        "," +
        demande.ArrivalAddress
      );
    case "affecté":
      return (
        demande.DepartureGovernorate +
        "," +
        demande.DepartureCity +
        "," +
        demande.DepartureAddress
      );
    case "en cours":
      return (
        demande.DepartureGovernorate +
        "," +
        demande.DepartureCity +
        "," +
        demande.DepartureAddress
      );
    case "livre":
      return (
        demande.ArrivalGovernorate +
        "," +
        demande.ArrivalCity +
        "," +
        demande.ArrivalAddress
      );
    case "canceled":
      return "Address for canceled";
    default:
      return "";
  }
};
export const getStatusAddress = (demande) => {
  switch (demande.Status) {
    case "en cours":
      return demande.DepartureGovernorate + "," + demande.DepartureCity;
    case "affecté":
      return demande.DepartureGovernorate + "," + demande.DepartureCity;
    case "collecté":
      return demande.ArrivalGovernorate + "," + demande.ArrivalCity;
    case "livre":
      return demande.ArrivalGovernorate + "," + demande.ArrivalCity;
    case "canceled":
      return "Address for canceled";
    default:
      return "";
  }
};
export const getStatusLabName = (demande) => {
  switch (demande.Status) {
    case "en cours":
      return demande.DepartureLabName;
    case "affecté":
      return demande.DepartureLabName;
    case "collecté":
      return demande.ArrivalLabName;
    case "livre":
      return demande.ArrivalLabName;
    case "canceled":
      return "canceled";
    default:
      return "";
  }
};
