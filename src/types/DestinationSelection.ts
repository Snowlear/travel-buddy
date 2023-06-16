import { City } from "./City";

export interface DestinationSelection {
  name: string;
  error?: string;
  suggestions?: City[];
  isValid: boolean;
}

export const exampleDestinationSelection = { name: "", isValid: false };
