# Property Welcome Page Generator

A Next.js application that generates static welcome pages for properties, supporting multiple languages and featuring amenity information, location details, and WiFi access.

## Features

- 🌐 Multilingual support (English & Arabic)
- 📍 Interactive location maps with directions
- 📱 QR code WiFi connection
- 🏠 Property details and house rules
- 🎯 Nearby attractions
- 💬 WhatsApp support integration
- 🌙 Dark mode support

## Setup

1. Clone the repository and install dependencies:
```bash
git clone [repository-url]
cd [repository-name]
pnpm install
```

2. Configure environment variables:
```bash
# .env.local
NEXT_PUBLIC_BASE_PATH=/your-repo-name  # For GitHub Pages deployment
```

## Adding/Editing Properties

Properties are configured in `src/data/properties.json`. Each property follows this structure:

```json
{
  "id": "unique-property-id",
  "name": {
    "en": "Property Name in English",
    "ar": "Property Name in Arabic"
  },
  "welcomeMessage": {
    "en": "Welcome message in English",
    "ar": "Welcome message in Arabic"
  },
  "location": {
    "address": "Physical address",
    "googleMapsUrl": "Google Maps URL",
    "coordinates": {
      "lat": 26.2874,
      "lng": 50.2240
    },
    "directions": {
      "en": "Directions in English",
      "ar": "Directions in Arabic"
    }
  },
  "wifi": {
    "ssid": "WiFi network name",
    "password": "WiFi password"
  },
  "nearbyAttractions": [
    {
      "image": "Attraction image URL",
      "title": {
        "en": "Attraction name in English",
        "ar": "Attraction name in Arabic"
      },
      "description": {
        "en": "Description in English",
        "ar": "Description in Arabic"
      },
      "distance": {
        "en": "5 minutes walk",
        "ar": "٥ دقائق مشياً"
      },
      "link": "Google Maps link to attraction"
    }
  ],
  "advertisement": {
    "image": "Advertisement image URL",
    "title": {
      "en": "Advertisement title in English",
      "ar": "Advertisement title in Arabic"
    },
    "description": {
      "en": "Description in English",
      "ar": "Description in Arabic"
    },
    "link": "Advertisement link"
  },
  "houseRules": [
    {
      "icon": "🚭",
      "title": "Rule title",
      "description": "Rule description"
    }
  ],
  "supportContact": "WhatsApp number with country code"
}
```

## Development

```bash
# Run development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm start
```

## Deployment

The project is configured for GitHub Pages deployment using GitHub Actions. The workflow automatically builds and deploys when pushing to the main branch.

### Custom Domain Setup

1. Update `NEXT_PUBLIC_BASE_PATH` in your environment variables
2. Configure GitHub Pages settings in your repository
3. (Optional) Add a custom domain in GitHub repository settings

## Customization

### Styling
- Tailwind CSS classes in component files
- Theme colors in `tailwind.config.ts`
- Dark mode toggle included

### Adding Languages
1. Add new language code to `generateStaticParams` in dynamic route pages
2. Add translations to `properties.json`
3. Update language selection UI

## License

MIT License - feel free to use and modify as needed.
