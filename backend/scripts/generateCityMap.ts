import * as fs from "fs";
import * as path from "path";

// Function to read and parse the city list JSON file
function readCityList(filePath: string): Map<string, boolean> {
  const data = fs.readFileSync(filePath, "utf-8");
  const cities = JSON.parse(data);
  const cityMap = new Map<string, boolean>();

  cities.forEach((city: { name: string }) => {
    cityMap.set(city.name.toLowerCase(), true);
  });

  return cityMap;
}

// Generate the city map and save it to a JSON file
const cityListPath = path.join(__dirname, "./city.list.json");
const cityMap = readCityList(cityListPath);
const cityMapObject = Object.fromEntries(cityMap);

const outputFilePath = path.join(__dirname, "../src/data/cityMap.json");
fs.writeFileSync(outputFilePath, JSON.stringify(cityMapObject, null, 2));
