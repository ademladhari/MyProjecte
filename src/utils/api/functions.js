export const getStatusAddressForMap = (demande) => {
  switch (demande.Status) {
    case "collected":
      return (
        demande.ArrivalGovernorate +
        "," +
        demande.ArrivalCity +
        "," +
        demande.ArrivalAddress
      );
    case "affected":
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
    case "livrer":
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
      return (
        demande.ArrivalGovernorate +
        "," +
        demande.ArrivalCity +
        "," +
        demande.ArrivalAddress
      );
  }
};
export const getCoordinatesForMap = (demande) => {
  console.log("heh", demande.DepartureCoordinates);
  switch (demande.Status) {
    case "collected":
      return demande.ArrivalCoordinates;
    case "affected":
      return demande.DepartureCoordinates;
    case "en cours":
      return demande.DepartureCoordinates;
    case "livre":
      return demande.ArrivalCoordinates;
    case "canceled":
      return "Address for canceled";
    default:
      return demande.ArrivalCoordinates;
  }
};
export const getStatusAddress = (demande) => {
  switch (demande.Status) {
    case "en cours":
      return demande.DepartureGovernorate + "," + demande.DepartureCity;
    case "affected":
      return demande.DepartureGovernorate + "," + demande.DepartureCity;
    case "collected":
      return demande.ArrivalGovernorate + "," + demande.ArrivalCity;
    case "livrer":
      return demande.ArrivalGovernorate + "," + demande.ArrivalCity;
    case "canceled":
      return "Address for canceled";
    default:
      return demande.ArrivalGovernorate + "," + demande.ArrivalCity;
  }
};
export const getStatusLabName = (demande) => {
  switch (demande.Status) {
    case "en cours":
      return demande.DepartureLabName;
    case "affected":
      return demande.DepartureLabName;
    case "collected":
      return demande.ArrivalLabName;
    case "livrer":
      return demande.ArrivalLabName;
    case "canceled":
      return "canceled";
    default:
      return demande.ArrivalLabName;
  }
};
