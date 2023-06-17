import { defineStore } from 'pinia'
import { Root } from './typings';
import { reactive } from 'vue';

export const useFilesStore = defineStore('files', () => {
  const files: Map<string, Root[]> = reactive(new Map());
  return { files }
})