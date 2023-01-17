export type ILocation = {
  name: string;
  center: google.maps.LatLngLiteral;
};

export type IPlace = google.maps.places.PlaceResult;
export interface IPlaceDetails extends IPlace {
  formatted_address: string;
  formatted_phone_number: string;
  opening_hours: google.maps.places.PlaceOpeningHours;
  website: string;
  html_attributions: string[];
}
