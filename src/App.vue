<template>
  <v-app>
    <v-main>
      <Editor v-if="directorySelected"></Editor>
      <div v-else id="button-container">
        <v-btn @click="handleButtonClick">Select "lexicon-json/lexicon" Directory Path</v-btn>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Editor from '@/components/Editor.vue'
import { ref } from 'vue';
import { readTextFile } from './common/utils';
import { useFilesStore } from './common/store';
import { Root } from './common/typings';

const directorySelected = ref(false);
const filesStore = useFilesStore();
async function handleButtonClick() {
  const ok1 = await initDirHandle();
  if (!ok1) return;
  const ok2 = await initFiles();
  if (!ok2) return;
  directorySelected.value = true;
}

async function initDirHandle(): Promise<boolean> {
  try {
    window.dirHandle = await window.showDirectoryPicker();
  } catch (e) {
    if (!(e instanceof Error)) {
      alert(`Unknown error type: ${e}`);
      return false;
    }
    if (e.message === 'The user aborted a request.') return false;
    alert('Your browser does not support the File System Access API. Try to use the latest Chrome.');
    return false;
  }
  return true
}

async function initFiles(): Promise<boolean> {
  if (window.dirHandle === null) return false;
  for await (const [_, handle] of window.dirHandle.entries()) {
    if (handle.kind === 'directory') {
      alert('Unexpected directory. There should be only json files in the directory you selected.');
      return false;
    }
    const file = await handle.getFile();
    const content = await readTextFile(file);
    try {
      filesStore.files.set(file.name, JSON.parse(content) as Root[])
    } catch {
      alert(`${file.name} cannot be parsed as JSON correctly.`);
      return false;
    }
  }
  return true;
}
</script>

<style>
#button-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
