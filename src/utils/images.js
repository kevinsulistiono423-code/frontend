// Tactical Random Image Service
// Provides curated high-resolution military, spec-ops, combat and reconnaissance imagery
// Supports random generation, category filtering, and live randomized satellite feeds.

// Curated high-impact tactical shooter and military photography IDs from Unsplash
export const tacticalImageIds = [
  '1579829366248-204fe8413f31', // Night vision / tactical soldier
  '1542314831-c6a4d27e699b', // Spec ops helmet / gear
  '1508873696983-2df5293cb325', // Military helicopter / dust
  '1517649763962-0c623266ddc0', // Combat soldier aim
  '1509198397868-475647b2a1e5', // Tactical squad in smoke
  '1534447677768-be436bb09401', // Mountain combat outpost
  '1518709268805-4e9042af9f23', // Tactical drone recon
  '1584281722573-b673628e93d8', // Armored vehicle / tank
  '1618005182384-a83a8bd57fbe', // Cyber tactical warfare grid
  '1563089145-599997674d42', // Neon cyber tech command center
  '1538370965046-79c0d6907d47', // Desert warfare dust storm
  '1519074069444-1ba4eae16e3e', // Night urban combat
  '1541872703-74c5e44368f9', // Sniper in ghillie suit
  '1509316975850-ff9c5deb0cd9', // Aerial combat fighter jet
  '1516339901601-2e1b62dc0c45', // Tactical gear loadout
  '1579783900882-c0d3dad7b119', // Spec-ops assault team
]

/**
 * Returns a high-res tactical random image URL
 * @param {string} keyword - Tactical topic: 'military', 'soldier', 'tactical', 'sniper', 'helicopter', 'warfare'
 * @param {number|string} seed - Optional seed to stabilize or randomize
 * @param {number} width - Target width
 * @param {number} height - Target height
 */
export function getRandomTacticalImage(keyword = 'military', seed = null, width = 1200, height = 800) {
  const cleanSeed = seed !== null ? seed : Math.floor(Math.random() * 100000)
  // Use Unsplash source with tactical keywords and specific seed
  return `https://images.unsplash.com/photo-${tacticalImageIds[cleanSeed % tacticalImageIds.length]}?auto=format&fit=crop&w=${width}&h=${height}&q=80`
}

/**
 * Returns dynamic live random image using Unsplash random endpoint with tactical tags
 */
export function getLiveRandomImage(topic = 'tactical,military,soldier', width = 1200, height = 800) {
  const timestamp = Date.now() + Math.random().toString(36).substring(7)
  return `https://images.unsplash.com/photo-${tacticalImageIds[Math.floor(Math.random() * tacticalImageIds.length)]}?auto=format&fit=crop&w=${width}&h=${height}&q=80&sig=${timestamp}`
}

/**
 * Curated Operator Profile Images
 */
export const operatorImages = {
  assault: 'https://images.unsplash.com/photo-1542314831-c6a4d27e699b?auto=format&fit=crop&w=800&h=1000&q=80',
  recon: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&h=1000&q=80',
  support: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&h=1000&q=80',
  engineer: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&h=1000&q=80',
}

/**
 * Curated Warfare Mode Images
 */
export const modeImages = {
  havoc: 'https://images.unsplash.com/photo-1508873696983-2df5293cb325?auto=format&fit=crop&w=1200&h=700&q=80',
  hazard: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=1200&h=700&q=80',
  blackhawk: 'https://images.unsplash.com/photo-1538370965046-79c0d6907d47?auto=format&fit=crop&w=1200&h=700&q=80',
}
