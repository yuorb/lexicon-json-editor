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
  const dirHandle = await getDirHandle();
  if (!dirHandle) return;
  const ok = await initFiles(dirHandle);
  if (!ok) return;
  directorySelected.value = true;
}

async function getDirHandle(): Promise<FileSystemDirectoryHandle | null> {
  let dirHandle: FileSystemDirectoryHandle;
  try {
    dirHandle = await window.showDirectoryPicker();
  } catch (e) {
    if (!(e instanceof Error)) {
      alert(`Unknown error type: ${e}`);
      return null;
    }
    if (e.message === 'The user aborted a request.') return null;
    alert('Your browser does not support the File System Access API. Try to use the latest Chrome.');
    return null;
  }
  return dirHandle;
}

async function initFiles(dirHandle: FileSystemDirectoryHandle): Promise<boolean> {
  for await (const [_, handle] of dirHandle.entries()) {
    if (handle.kind === 'directory') {
      alert('Unexpected directory. There should be only json files in the directory you selected.');
      return false;
    }
    const file = await handle.getFile();
    const content = await readTextFile(file);
    filesStore.files.set(file.name, JSON.parse(content) as Root[])
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
