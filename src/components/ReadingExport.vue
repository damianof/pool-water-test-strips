<script setup lang="ts">
import { computed } from 'vue'
import type { Reading } from '../types/chemicals'
import { chemicals } from '../data/chemicals'

const props = defineProps<{ reading: Reading }>()

const emit = defineEmits<{ clear: [] }>()

function exportJson() {
  const out: Record<string, { value: number; label: string; hex: string; oklch: string } | null> = {}
  for (const chem of chemicals) {
    const sw = props.reading[chem.key] ?? null
    out[chem.key] = sw
      ? { value: sw.value, label: sw.label, hex: sw.color.hex, oklch: sw.color.oklch }
      : null
  }
  const blob = new Blob([JSON.stringify(out, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `pool-reading-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

const completedCount = computed(() =>
  chemicals.filter(c => props.reading[c.key] != null).length
)
</script>

<template>
  <div class="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg px-6 py-4 flex items-center justify-between gap-4">
    <span class="text-sm text-gray-500">
      {{ completedCount }} / {{ chemicals.length }} parameters recorded
    </span>
    <div class="flex gap-2">
      <button
        type="button"
        class="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
        @click="emit('clear')"
      >
        Clear
      </button>
      <button
        type="button"
        :disabled="completedCount === 0"
        class="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        @click="exportJson"
      >
        Export JSON
      </button>
    </div>
  </div>
</template>
