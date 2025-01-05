interface Location {
  address: string;
  googleMapsUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  directions: {
    en: string;
    ar: string;
  };
}

interface WiFiDetails {
  ssid: string;
  password: string;
}

interface HouseRule {
  icon: string;
  title: string;
  description: string;
}

interface Advertisement {
  image: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  link: string;
}

interface NearbyAttraction {
  image: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  distance: {
    en: string;
    ar: string;
  };
  link: string;
}

export interface Property {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  welcomeMessage: {
    en: string;
    ar: string;
  };
  location: Location;
  wifi: WiFiDetails;
  advertisement: Advertisement;
  houseRules: HouseRule[];
  supportContact: string;
  images: string[];
  nearbyAttractions: NearbyAttraction[];
} 