import * as fs from "fs";
import * as path from "path";

// Function to load the city map from the pre-generated JSON file
function loadCityMap(filePath: string): Map<string, boolean> {
  const data = fs.readFileSync(filePath, "utf-8");
  const cityMapObject = JSON.parse(data);
  return new Map(Object.entries(cityMapObject));
}

// Export the city map
const cityMapPath = path.join(__dirname, "cityMap.json");
export const cityMap = loadCityMap(cityMapPath);

// Function to check if a string contains a city name
export function containsCityName(
  cityMap: Map<string, boolean>,
  text: string
): string | null {
  const words = text.toLowerCase().split(/\s+/);
  for (const word of words) {
    if (cityMap.has(word)) {
      return word;
    }
  }
  return null;
}
