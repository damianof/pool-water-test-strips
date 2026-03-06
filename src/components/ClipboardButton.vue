<script setup lang="ts">
import { ref } from 'vue'

type TProps = {
  sizeClass: string
}
type TEmits = {
  (e: 'click', ev: any): any
}
const props = defineProps<TProps>()
const emits = defineEmits<TEmits>()

const refClipboardSuccess = ref(false)

const onClick = (ev: any) => {
  refClipboardSuccess.value = true
  emits('click', ev)
  setTimeout(() => {
    refClipboardSuccess.value = false
  }, 750)
}
</script>

<template>
  <button
    type="button"
    class="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    @click.prevent="onClick"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="`${sizeClass} ${refClipboardSuccess ? 'text-success' : 'text-primary'}`"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path v-if="refClipboardSuccess" d="m9 14 2 2 4-4" />
    </svg>
    <span>{{ refClipboardSuccess ? 'Copied!' : 'Copy' }}</span>
  </button>
</template>
