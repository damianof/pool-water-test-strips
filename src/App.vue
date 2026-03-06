<script setup lang="ts">
import { reactive } from 'vue'
import type { ColorSwatch, Reading } from './types/chemicals'
import { chemicals } from './data/chemicals'
import ChemicalRow from './components/ChemicalRow.vue'
import ReadingExport from './components/ReadingExport.vue'

const reading = reactive<Reading>(Object.fromEntries(chemicals.map((c) => [c.key, null])))

function select(key: string, swatch: ColorSwatch) {
  reading[key] = swatch
}

function clearAll() {
  for (const key of Object.keys(reading)) reading[key] = null
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    <header class="bg-white border-b border-gray-200 px-4 py-2 sm:px-6 sm:py-4 shadow-sm">
      <h1 class="text-2xl font-bold text-gray-800">Pool Water Test Strip Reader</h1>
      <p class="text-sm text-gray-500 mt-0.5">
        Tap the swatch that best matches your test strip to record each reading.
      </p>
    </header>

    <main class="max-w-2xl mx-auto sm:px-6 sm:py-4">
      <div class="bg-white sm:rounded-xl shadow-sm overflow-hidden">
        <ChemicalRow
          v-for="chem in chemicals"
          :key="chem.key"
          :chemical="chem"
          :selected="reading[chem.key] ?? null"
          @select="select(chem.key, $event)"
        />
      </div>
    </main>

    <ReadingExport :reading="reading" @clear="clearAll" />
  </div>
</template>
