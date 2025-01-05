export interface Location {
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

export interface WiFiDetails {
  ssid: string;
  password: string;
  provider: {
    name: string;
    speed: string;
  };
  description: {
    en: string;
    ar: string;
  };
}

export interface NearbyAttraction {
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

export interface Advertisement {
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

export interface HouseRule {
  icon: string;
  title: string;
  description: string;
}

export interface SEO {
  description: {
    en: string;
    ar: string;
  };
  images: {
    url: string;
    width: number;
    height: number;
    alt: {
      en: string;
      ar: string;
    };
  }[];
}

export interface Amenity {
  id: string;
  icon: string;
  title: {
    en: string;
    ar: string;
  };
  description?: {
    en: string;
    ar: string;
  };
}

export interface Property {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  seo: SEO;
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
  amenities: Amenity[];
} 