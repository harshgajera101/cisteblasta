// import { clsx, type ClassValue } from "clsx";
// import { twMerge } from "tailwind-merge";

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// // --- NEW: Delivery Calculation Logic (Haversine Formula) ---

// // 1. Replace these with your Sister's Kitchen Coordinates
// // You can get them from Google Maps: Right-click > "What's here?"
// export const KITCHEN_COORDS = {
//   lat: 19.256083, // Converted from 19°15'21.9"N
//   lng: 72.865444, // Converted from 72°51'55.6"E
// };

// // 2. Rate per Kilometer (in Rupees)
// export const DELIVERY_RATE_PER_KM = 20;
// export const MIN_DELIVERY_CHARGE = 40; // Minimum charge even if nearby

// export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
//   const R = 6371; // Radius of the earth in km
//   const dLat = deg2rad(lat2 - lat1);
//   const dLon = deg2rad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//     Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const d = R * c; // Distance in km
//   return d;
// }

// function deg2rad(deg: number) {
//   return deg * (Math.PI / 180);
// }




import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const KITCHEN_COORDS = {
  lat: 19.256083, // Your sister's actual coordinates
  lng: 72.865444, 
};

export const DELIVERY_RATE_PER_KM = 10;
export const MIN_DELIVERY_CHARGE = 40;

// NEW: Multiplier to convert "Air Distance" to estimated "Road Distance"
// 1.5 is a standard safety buffer for urban areas (accounting for turns/traffic)
const ROAD_BUFFER = 1.5; 

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  const straightLineDistance = R * c; 
  
  // Return the estimated driving distance
  return straightLineDistance * ROAD_BUFFER;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}