import { City } from "../types/City";
import { haversineDistance } from "./utils";

const CITIES: City[] = [
  { name: "Paris", latitude: 48.856614, longitude: 2.352222 },
  { name: "Marseille", latitude: 43.296482, longitude: 5.36978 },
  { name: "Lyon", latitude: 45.764043, longitude: 4.835659 },
  { name: "Toulouse", latitude: 43.604652, longitude: 1.444209 },
  { name: "Nice", latitude: 43.710173, longitude: 7.261953 },
  { name: "Nantes", latitude: 47.218371, longitude: -1.553621 },
  { name: "Strasbourg", latitude: 48.573405, longitude: 7.752111 },
  { name: "Montpellier", latitude: 43.610769, longitude: 3.876716 },
  { name: "Bordeaux", latitude: 44.837789, longitude: -0.57918 },
  { name: "Lille", latitude: 50.62925, longitude: 3.057256 },
  { name: "Rennes", latitude: 48.117266, longitude: -1.677793 },
  { name: "Reims", latitude: 49.258329, longitude: 4.031696 },
  { name: "Le Havre", latitude: 49.49437, longitude: 0.107929 },
  { name: "Saint-Étienne", latitude: 45.439695, longitude: 4.387178 },
  { name: "Toulon", latitude: 43.124228, longitude: 5.928 },
  { name: "Angers", latitude: 47.478419, longitude: -0.563166 },
  { name: "Grenoble", latitude: 45.188529, longitude: 5.724524 },
  { name: "Dijon", latitude: 47.322047, longitude: 5.04148 },
  { name: "Nîmes", latitude: 43.836699, longitude: 4.360054 },
  { name: "Aix-en-Provence", latitude: 43.529742, longitude: 5.447427 },
];

const DELAY = 1000; // simulate delay in milliseconds

export const searchCities = async (keyword: string) => {
  await new Promise((resolve) => setTimeout(resolve, DELAY));

  if (keyword.toLocaleLowerCase() === "fail") {
    throw new Error("Server encountered a problem.");
  }
  return CITIES.filter((city) =>
    city.name.toLowerCase().includes(keyword.toLowerCase())
  );
};

export const isValidCity = async (input: string) => {
  await new Promise((resolve) => setTimeout(resolve, DELAY));
  if (input.toLocaleLowerCase() === "fail") {
    throw new Error("Server encountered a problem.");
  }
  return CITIES.some((city) => city.name === input);
};

export const isValidCities = async (input: string[]) => {
  await new Promise((resolve) => setTimeout(resolve, DELAY));
  return input.map((cityName) => CITIES.some((city) => city.name === cityName));
};

export const calculateDistances = async (cities: City[]) => {
  await new Promise((resolve) => setTimeout(resolve, DELAY));
  const distances = [];
  for (let i = 0; i < cities.length - 1; i++) {
    if (cities[i].name === "Dijon" || cities[i + 1].name === "Dijon") {
      throw new Error("Server encountered a problem.");
    } else {
      distances.push(haversineDistance(cities[i], cities[i + 1]));
    }
  }
  return distances;
};

export const getCities = async (cityNames: string[]) => {
  await new Promise((resolve) => setTimeout(resolve, DELAY));
  const cities = CITIES.filter((city) => cityNames.includes(city.name));
  if (cities.length !== cityNames.length) {
    throw new Error("One or more cities not found");
  }
  return cities;
};
