import type { ChemicalParameter, ColorSwatch } from '../types/chemicals'
import { hexToOklch } from '../utils/color'

function swatch(value: number, label: string, hex: string, isIdeal: boolean): ColorSwatch {
  return { value, label, color: { hex, oklch: hexToOklch(hex) }, isIdeal }
}

export const chemicals: ChemicalParameter[] = [
  {
    key: 'totalChlorine',
    name: 'Total Chlorine',
    unit: 'ppm',
    description: 'Total chlorine (free + combined) in the water.',
    idealRange: { min: 1, max: 5 },
    swatches: [
      swatch(0,    '0',    '#fdf7db', false),
      swatch(0.5,  '0.5',  '#f2f7da', false),
      swatch(1,    '1',    '#d3eec0', true),
      swatch(3,    '3',    '#b5e5be', true),
      swatch(5,    '5',    '#98d7c1', true),
      swatch(10,   '10',   '#79cacc', false),
      swatch(20,   '20',   '#64bfce', false),
    ],
  },
  {
    key: 'freeChlorine',
    name: 'Free Chlorine',
    unit: 'ppm',
    description: 'Active sanitiser available to disinfect the water.',
    idealRange: { min: 1, max: 5 },
    swatches: [
      swatch(0,    '0',    '#ffffff', false),
      swatch(0.5,  '0.5',  '#e7f7fa', false),
      swatch(1,    '1',    '#cdeef5', true),
      swatch(3,    '3',    '#a6dfec', true),
      swatch(5,    '5',    '#85cee5', true),
      swatch(10,   '10',   '#73c7e5', false),
      swatch(20,   '20',   '#60c0e3', false),
    ],
  },
  {
    key: 'freeBromine',
    name: 'Free Bromine',
    unit: 'ppm',
    description: 'Alternative sanitiser, common in spas and hot tubs.',
    idealRange: { min: 2, max: 10 },
    swatches: [
      swatch(0,    '0',    '#fdfdfb', false),
      swatch(1,    '1',    '#fdedf0', false),
      swatch(2,    '2',    '#f0d4e7', true),
      swatch(5,    '5',    '#e1bde1', true),
      swatch(10,   '10',   '#cfa1d5', true),
      swatch(20,   '20',   '#c491bc', false),
      swatch(40,   '40',   '#b57ca5', false),
    ],
  },
  {
    key: 'hardness',
    name: 'Hardness',
    unit: 'ppm',
    description: 'Calcium hardness – prevents corrosion and scaling.',
    idealRange: { min: 250, max: 500 },
    swatches: [
      swatch(0,    '0',    '#4e6d97', false),
      swatch(50,   '50',   '#617bb8', false),
      swatch(100,  '100',  '#6573b1', false),
      swatch(250,  '250',  '#6a67a5', true),
      swatch(500,  '500',  '#7a609f', true),
      swatch(1000, '1000', '#8c5f9f', false),
    ],
  },
  {
    key: 'cyanuricAcid',
    name: 'Cyanuric Acid',
    unit: 'ppm',
    description: 'Stabiliser that protects chlorine from UV degradation.',
    idealRange: { min: 30, max: 100 },
    swatches: [
      swatch(0,   '0',     '#fbb965', false),
      swatch(40,  '30-50', '#ec895e', true),   // midpoint 40 used as numeric value
      swatch(100, '100',   '#cf604f', true),
      swatch(150, '150',   '#b54951', false),
      swatch(240, '240',   '#c34987', false),
    ],
  },
  {
    key: 'totalAlkalinity',
    name: 'Total Alkalinity',
    unit: 'ppm',
    description: 'Buffers pH to resist rapid changes.',
    idealRange: { min: 80, max: 120 },
    swatches: [
      swatch(0,   '0',   '#fedd7d', false),
      swatch(40,  '40',  '#c5c27c', false),
      swatch(80,  '80',  '#a4b77e', true),
      swatch(120, '120', '#7faa81', true),
      swatch(180, '180', '#558472', false),
      swatch(240, '240', '#46716a', false),
    ],
  },
  {
    key: 'ph',
    name: 'pH',
    unit: '',
    description: 'Acidity/alkalinity balance – affects swimmer comfort and sanitiser efficiency.',
    idealRange: { min: 7.2, max: 7.8 },
    swatches: [
      swatch(6.2, '6.2', '#fdd06a', false),
      swatch(6.8, '6.8', '#fcc068', false),
      swatch(7.2, '7.2', '#faaa60', true),
      swatch(7.6, '7.6', '#fa9177', true),
      swatch(7.8, '7.8', '#fa7b71', true),
      swatch(8.4, '8.4', '#fb646a', false),
    ],
  },
]
