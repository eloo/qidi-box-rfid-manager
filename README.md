# QIDI Box RFID Manager

A React Native mobile application for reading and writing RFID tags for QIDI Box 3D printer filaments.

## Features

- **Read RFID Tags**: Scan and decode QIDI Box filament RFID tags
- **Display Tag Information**: View material type, color, manufacturer, and raw data
- **Write to Tags**: Select material and color from dropdowns and write to tags
- **Material Support**: All 50 QIDI filament types (PLA, ABS, PETG, TPU, PA, etc.)
- **Color Support**: All 24 color codes with visual previews
- **Dark Mode**: Automatic system theme detection
- **Authentication**: Supports both primary and fallback authentication keys

## Technical Details

### RFID Specifications
- **Chip**: FM11RF08S (Mifare Classic compatible)
- **Protocol**: ISO/IEC 14443-A
- **Frequency**: 13.56 MHz
- **Data Location**: Sector 1, Block 0 (Total Block #4)
- **Data Format**: 3 bytes (Material Code, Color Code, Manufacturer Code)

### Authentication Keys
- Primary: `0xD3F7D3F7D3F7`
- Fallback: `0xFFFFFFFFFFFF` (factory default)

## Prerequisites

- Node.js 18+ and pnpm
- Android device with NFC support (Android 12+ / API 31+)
- Physical device required (NFC cannot be tested on emulator)

## Installation

1. Install dependencies:
```bash
pnpm install
```

2. Create a development build:
```bash
npx expo install expo-dev-client
eas build --profile development --platform android
```

3. Install the development build on your Android device

4. Start the development server:
```bash
pnpm start
```

## Usage

### Reading a Tag
1. Tap "Scan Tag" button
2. Hold your phone near the RFID tag
3. View the decoded tag information

### Writing to a Tag
1. First, scan a tag to read its current data
2. Select the desired material type from the dropdown
3. Select the desired color from the dropdown (with color preview)
4. Tap "Write to Tag" button
5. Hold your phone near the RFID tag to write

## Project Structure

```
qidi-rfid/
├── app/
│   ├── (tabs)/
│   │   └── index.tsx          # Main screen with scan/write workflow
│   └── _layout.tsx            # Root layout with React Native Paper provider
├── components/
│   ├── TagDataCard.tsx        # Displays tag information
│   └── ColorPreview.tsx       # Color chip component
├── services/
│   └── nfcService.ts          # NFC read/write operations
├── constants/
│   ├── materials.ts           # 50 material types lookup table
│   └── colors.ts              # 24 colors with RGB values
├── types/
│   └── index.ts               # TypeScript interfaces
└── app.json                   # Expo configuration with NFC plugin
```

## Technologies

- **Expo** - React Native framework
- **react-native-nfc-manager** - NFC functionality
- **React Native Paper** - Material Design UI components
- **TypeScript** - Type safety
- **Expo Router** - File-based routing

## Supported Materials (50 Types)

PLA, PLA Matte, PLA Metal, PLA Silk, PLA-CF, PLA-Wood, PLA Basic, ABS, ABS-GF, ABS-Metal, ASA, UltraPA, PA-CF, PAHT-CF, PAHT-GF, PET-CF, PET-GF, PETG Basic, PETG Tough, PETG-CF, PETG-GF, PPS-CF, PVA, TPU, TPU-Aero, and more.

## Supported Colors (24 Types)

White, Black, Light Gray, Lime Green, Mint, Blue, Pink, Yellow, Forest Green, Light Blue, Dark Blue, Lavender, Purple, Red, Orange, Gold, Brown, Beige, and more - all with RGB color previews.

## Build for Production

```bash
eas build --platform android --profile production
```

## License

MIT

## Credits

Based on QIDI Box RFID specifications from [QIDI Wiki](https://wiki.qidi3d.com/en/QIDIBOX/RFID)
