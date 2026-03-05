<script setup lang="ts">
import type { ChemicalParameter, ColorSwatch } from '../types/chemicals'

const props = defineProps<{
  chemical: ChemicalParameter
  selected: ColorSwatch | null
}>()

const emit = defineEmits<{
  select: [swatch: ColorSwatch]
}>()
</script>

<template>
  <div class="py-4 border-b border-gray-200 last:border-0">
    <div class="flex items-baseline gap-2 mb-3">
      <h3 class="text-base font-bold text-gray-800">{{ chemical.name }}</h3>
      <span v-if="chemical.unit" class="text-sm text-gray-500">({{ chemical.unit }})</span>
      <span class="ml-auto text-xs text-gray-400">
        Ideal: {{ chemical.idealRange.min }}–{{ chemical.idealRange.max }}
        {{ chemical.unit }}
      </span>
    </div>

    <div class="flex flex-wrap gap-3">
      <button
        v-for="sw in chemical.swatches"
        :key="sw.label"
        type="button"
        class="flex flex-col items-center gap-1 focus:outline-none group"
        @click="emit('select', sw)"
      >
        <span
          class="w-12 h-12 rounded-md shadow-sm transition-transform duration-100 group-hover:scale-110"
          :class="[
            sw.isIdeal ? 'ring-2 ring-green-400 ring-offset-1' : 'ring-1 ring-gray-200',
            selected?.value === sw.value ? 'scale-110 ring-2 ring-blue-500 ring-offset-2' : '',
          ]"
          :style="{ backgroundColor: sw.color.hex }"
        />
        <span class="text-xs font-mono font-semibold text-gray-700 leading-none">
          {{ sw.label }}
        </span>
        <span v-if="sw.isIdeal" class="text-[10px] text-green-600 font-bold leading-none">OK</span>
      </button>
    </div>
  </div>
</template>
