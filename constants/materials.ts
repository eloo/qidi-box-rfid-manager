import type { Material } from "@/types";

export const MATERIALS: Material[] = [
  { code: 1, name: "PLA" },
  { code: 2, name: "PLA Matte" },
  { code: 3, name: "PLA Metal" },
  { code: 4, name: "PLA Silk" },
  { code: 5, name: "PLA-CF" },
  { code: 6, name: "PLA-Wood" },
  { code: 7, name: "PLA Basic" },
  { code: 8, name: "PLA Matte Basic" },
  // { code: 9, name: 'Unknown 9' },
  // { code: 10, name: 'Unknown 10' },
  { code: 11, name: "ABS" },
  { code: 12, name: "ABS-GF" },
  { code: 13, name: "ABS-Metal" },
  { code: 14, name: "ABS-Odorless" },
  // { code: 15, name: 'Unknown 15' },
  // { code: 16, name: 'Unknown 16' },
  // { code: 17, name: 'Unknown 17' },
  { code: 18, name: "ASA" },
  { code: 19, name: "ASA-AERO" },
  // { code: 20, name: 'Unknown 20' },
  // { code: 21, name: 'Unknown 21' },
  // { code: 22, name: 'Unknown 22' },
  // { code: 23, name: 'Unknown 23' },
  { code: 24, name: "UltraPA" },
  { code: 25, name: "PA-CF" },
  { code: 26, name: "UltraPA-CF25" },
  { code: 27, name: "PA12-CF" },
  // { code: 28, name: 'Unknown 28' },
  // { code: 29, name: 'Unknown 29' },
  { code: 30, name: "PAHT-CF" },
  { code: 31, name: "PAHT-GF" },
  { code: 32, name: "Support For PAHT" },
  { code: 33, name: "Support For PET/PA" },
  { code: 34, name: "PC/ABS-FR" },
  // { code: 35, name: 'Unknown 35' },
  // { code: 36, name: 'Unknown 36' },
  { code: 37, name: "PET-CF" },
  { code: 38, name: "PET-GF" },
  { code: 39, name: "PETG Basic" },
  { code: 40, name: "PETG Tough" },
  { code: 41, name: "PETG Rapido" },
  { code: 42, name: "PETG-CF" },
  { code: 43, name: "PETG-GF" },
  { code: 44, name: "PPS-CF" },
  { code: 45, name: "PETG Translucent" },
  // { code: 46, name: 'Unknown 46' },
  { code: 47, name: "PVA" },
  // { code: 48, name: 'Unknown 48' },
  { code: 49, name: "TPU-Aero" },
  { code: 50, name: "TPU" },
];

export const getMaterialByCode = (code: number): Material | undefined => {
  return MATERIALS.find((m) => m.code === code);
};

export const getMaterialName = (code: number): string => {
  const material = getMaterialByCode(code);
  return material ? material.name : "Unknown";
};
