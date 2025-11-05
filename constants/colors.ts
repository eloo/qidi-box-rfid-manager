import { Color } from '@/types';

export const COLORS: Color[] = [
  { code: 1, name: 'White', rgb: '#FAFAFA' },
  { code: 2, name: 'Black', rgb: '#060606' },
  { code: 3, name: 'Light Gray', rgb: '#D9E3ED' },
  { code: 4, name: 'Lime Green', rgb: '#5CF30F' },
  { code: 5, name: 'Mint', rgb: '#63E492' },
  { code: 6, name: 'Blue', rgb: '#2850FF' },
  { code: 7, name: 'Pink', rgb: '#FE98FE' },
  { code: 8, name: 'Yellow', rgb: '#DFD628' },
  { code: 9, name: 'Forest Green', rgb: '#228332' },
  { code: 10, name: 'Light Blue', rgb: '#99DEFF' },
  { code: 11, name: 'Dark Blue', rgb: '#1714B0' },
  { code: 12, name: 'Lavender', rgb: '#CEC0FE' },
  { code: 13, name: 'Yellow Green', rgb: '#CADE4B' },
  { code: 14, name: 'Navy Blue', rgb: '#1353AB' },
  { code: 15, name: 'Sky Blue', rgb: '#5EA9FD' },
  { code: 16, name: 'Purple', rgb: '#A878FF' },
  { code: 17, name: 'Light Red', rgb: '#FE717A' },
  { code: 18, name: 'Red', rgb: '#FF362D' },
  { code: 19, name: 'Beige', rgb: '#E2DFCD' },
  { code: 20, name: 'Gray', rgb: '#898F9B' },
  { code: 21, name: 'Brown', rgb: '#6E3812' },
  { code: 22, name: 'Tan', rgb: '#CAC59F' },
  { code: 23, name: 'Orange', rgb: '#F28636' },
  { code: 24, name: 'Gold', rgb: '#B87F2B' },
];

export const getColorByCode = (code: number): Color | undefined => {
  return COLORS.find(c => c.code === code);
};

export const getColorName = (code: number): string => {
  const color = getColorByCode(code);
  return color ? color.name : `Unknown (${code})`;
};

export const getColorRgb = (code: number): string => {
  const color = getColorByCode(code);
  return color ? color.rgb : '#000000';
};
