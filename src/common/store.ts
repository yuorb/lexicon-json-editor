import { defineStore } from 'pinia'
import { Root } from './typings';
import { reactive, ref } from 'vue';

export const useFilesStore = defineStore('files', () => {
  const files: Map<string, Root[]> = reactive(new Map());
  const isWritingFiles = ref(false);
  return { files, isWritingFiles }
})