<script setup lang="ts">
import { computed } from 'vue'
import ClipboardButton from './ClipboardButton.vue'
import { chemicals } from '../data/chemicals'
import { useClipboard } from '../utils/use-clipboard'
import type { Reading } from '../types/chemicals'

const props = defineProps<{ reading: Reading }>()

const emit = defineEmits<{ clear: [] }>()

const completedCount = computed(() => chemicals.filter((c) => props.reading[c.key] != null).length)

const getDataToExport = (): {
  key: string
  value: number
  withinIdealRange: boolean
  hex: string
  oklch: string
}[] => {
  const out: { key: string; value: number; withinIdealRange: boolean; hex: string; oklch: string }[] =
    chemicals
      .filter((chem) => !!props.reading[chem.key])
      .map((chem) => {
        const sw = props.reading[chem.key]!
        return {
          key: chem.key,
          value: sw.value,
          withinIdealRange: sw.isIdeal,
          hex: sw.color.hex,
          oklch: sw.color.oklch,
        }
      })
  return out
}

const exportJson = () => {
  const out = getDataToExport()
  const blob = new Blob([JSON.stringify(out, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `pool-reading-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

const copyToClipboard = async (): Promise<string> => {
  const out = getDataToExport()
  const serialized = JSON.stringify(out, null, 2)
  console.log('copyToClipboard', serialized)
  const result = await useClipboard().copy(serialized)
  const currentContent = await useClipboard().read()
  console.log('copied', result, currentContent)
  return currentContent
}
</script>

<template>
  <div
    class="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg px-4 py-2 sm:px-6 sm:py-4 flex items-center justify-between gap-4"
  >
    <span class="text-xs sm:text-sm text-gray-500">
      {{ completedCount }} / {{ chemicals.length }} selected
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
        Export
      </button>
      <ClipboardButton :disabled="completedCount === 0" :size-class="'w-6 h-6'" @click="copyToClipboard" />
    </div>
  </div>
</template>
