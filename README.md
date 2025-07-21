# Games Wiki Test App

Angular application with Electron to search and view game information.

## Technologies

- Angular 19
- Electron 
- Angular Material
- Node.js

## How to run

### Development
```bash
npm install
npm start
```

### Electron
```bash
npm run electron
```

### Build
```bash
npm run build
```

### Distribution
```bash
npm run dist
npm run dist:linux
npm run dist:win
npm run dist:mac
```

### Tests
```bash
npm test
```

## Features

- ✅ Game listing
- ✅ Game search
- ✅ Game details
- ✅ Wikipedia integration
- ✅ Responsive interface

## Structure

```
src/
├── app/
│   ├── components/  
│   ├── pages/      
│   └── services/   
├── main.js         
└── preload.js      
```

## API

Base URL: `http://localhost:3000`

- `GET /games` - List games
- `GET /games/:id` - Game details
- Query params: `search`, `page`, `limit`
