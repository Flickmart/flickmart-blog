// MapTiler style configurations
export const MAPTILER_STYLES = {
  // Dark themes (perfect for your use case)
  'streets-dark': {
    id: 'streets-v2-dark',
    name: 'Streets Dark',
    description: 'Dark street map with blue tones',
  },
  'basic-dark': {
    id: 'basic-v2-dark',
    name: 'Basic Dark', 
    description: 'Minimalist dark theme',
  },
  'backdrop-dark': {
    id: 'backdrop-dark',
    name: 'Backdrop Dark',
    description: 'Clean dark background map',
  },
  
  // Light themes (can be darkened with CSS filters)
  'streets': {
    id: 'streets-v2',
    name: 'Streets',
    description: 'Standard street map',
  },
  'basic': {
    id: 'basic-v2',
    name: 'Basic',
    description: 'Clean, minimal design',
  },
  'bright': {
    id: 'bright-v2',
    name: 'Bright',
    description: 'High contrast, vibrant colors',
  },
  
  // Satellite and terrain
  'satellite': {
    id: 'satellite',
    name: 'Satellite',
    description: 'Satellite imagery',
  },
  'hybrid': {
    id: 'hybrid',
    name: 'Hybrid',
    description: 'Satellite with street labels',
  },
  'terrain': {
    id: 'landscape',
    name: 'Terrain',
    description: 'Topographic terrain map',
  },
  
  // Specialized themes
  'topo': {
    id: 'topo-v2',
    name: 'Topographic',
    description: 'Detailed topographic map',
  },
  'winter': {
    id: 'winter-v2',
    name: 'Winter',
    description: 'Winter-themed map',
  },
} as const;

export type MapTilerStyleId = keyof typeof MAPTILER_STYLES;

export function getMapTilerStyle(styleId: MapTilerStyleId) {
  return MAPTILER_STYLES[styleId];
}

export function getMapTilerUrl(styleId: MapTilerStyleId = 'streets-dark') {
  const style = MAPTILER_STYLES[styleId];
  return `/api/map/${style.id}/{z}/{x}/{y}.png`;
}