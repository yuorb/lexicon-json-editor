<template>
    <v-main>
        <v-toolbar>
            <v-toolbar-title>Lexicon JSON Editor</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="saveAllFiles" :disabled="filesStore.isWritingFiles">
                <v-icon>mdi-content-save</v-icon>
            </v-btn>
            <v-btn icon @click="createNewFile">
                <v-icon>mdi-file-plus</v-icon>
            </v-btn>
            <v-btn icon @click="createNewRoot">
                <v-icon>mdi-text-box-plus</v-icon>
            </v-btn>
            <template v-slot:extension>
                <v-tabs v-model="selectedTab">
                    <v-tab v-for="filename in filesStore.files.keys()" :value="filename">{{ filename.slice(0, -5) }}</v-tab>
                </v-tabs>
            </template>
        </v-toolbar>
        <v-window v-model="selectedTab">
            <v-window-item v-for="filename in filesStore.files.keys()" :value="filename">
                <FileEditor :filename="filename"></FileEditor>
            </v-window-item>
        </v-window>
    </v-main>
    <v-snackbar v-model="isSnackBarVisible" :timeout="3000">
        All files saved.
        <template v-slot:actions>
            <v-btn variant="text" @click="isSnackBarVisible = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script setup lang="ts">
import { useFilesStore } from '@/common/store';
import { ref } from 'vue';
import FileEditor from './FileEditor.vue'
import { trimJson } from '@/common/utils';

const filesStore = useFilesStore()
const selectedTab = ref('');
const isSnackBarVisible = ref(false);

async function saveAllFiles() {
    if (window.dirHandle === null) {
        'Error: window.dirHandle is null';
        return;
    };
    filesStore.isWritingFiles = true;
    for await (const [filename, handle] of window.dirHandle.entries()) {
        if (handle.kind === 'directory') {
            alert('Unexpected directory. There should be only json files in the directory you selected.');
            return false;
        }
        try {
            const stream = await handle.createWritable();
            const roots = filesStore.files.get(filename)!;
            const trimmedRoots =  trimJson(roots)
            await stream.write(JSON.stringify(trimmedRoots, null, 4));
            await stream.close();
        } catch (e) {
            console.error(e)
            return;
        }
    }
    isSnackBarVisible.value = true;
    filesStore.isWritingFiles = false;
}

async function createNewFile() {
    const filename = prompt('Please input the file name to create a new file (e.g. "1.0.json"):');
    if (filename === null) return;
    if (!/(\d\.)+\d\.json/.test(filename)) {
        alert('Filename is invalid. It should look like "1.2.3.json"')
        return;
    }
    filesStore.files.set(filename, []);
    if (window.dirHandle === null) {
        'Error: window.dirHandle is null';
        return;
    };
    const fileHandle = await window.dirHandle.getFileHandle(filename, { create: true });
    const stream = await fileHandle.createWritable();
    await stream.write('{}\n');
    await stream.close();
    filesStore.files.set(filename, []);
}

function createNewRoot() {
    if (selectedTab.value === '') {
        alert('No file is selected');
        return;
    }
    const rootStr = prompt('Please input the "Root" name to create a new root:');
    if (rootStr === null) return;
    const file = filesStore.files.get(selectedTab.value)!;
    if (file.find(r => r.root === rootStr) !== undefined) {
        alert('Duplicated root name.');
    }
    file.push({ root: rootStr })
}
</script>

<style scoped>
.v-main {
    display: flex;
    flex-direction: column;
    height: 100vh;
}
</style>