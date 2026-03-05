/**
 * A color represented in both hex and oklch.
 * oklch is perceptually uniform, making it better for color-distance
 * comparisons in the advanced image-analysis phase.
 */
export interface SwatchColor {
  hex: string
  /** oklch(L C H) – e.g. "oklch(0.87 0.08 145)" */
  oklch: string
}

export interface ColorSwatch {
  /** Numeric value used for comparisons and sorting (midpoint for range labels) */
  value: number
  /** Display label – may differ from value, e.g. "30-50" */
  label: string
  color: SwatchColor
  /** Whether this swatch falls inside the ideal range */
  isIdeal: boolean
}

export interface IdealRange {
  min: number
  max: number
}

export interface ChemicalParameter {
  /** Unique camelCase identifier */
  key: string
  name: string
  unit: string
  description?: string
  idealRange: IdealRange
  swatches: ColorSwatch[]
}

/** A single recorded reading: which swatch was selected for each chemical */
export type Reading = Record<string, ColorSwatch | null>
