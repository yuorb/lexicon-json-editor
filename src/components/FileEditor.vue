<template>
    <div class="file-editor">
        <v-list :items="filesStore.files.get(props.filename)?.map(({ root }) => ({ title: `${root}`, value: root }))"
            @click:select="handleRootSelect"></v-list>
        <RootEditor :filename="filename" :root="selectedRoot" v-if="selectedRoot !== ''"></RootEditor>
        <p v-else>Please select or create a root to edit.</p>
    </div>
</template>

<script setup lang="ts">
import { useFilesStore } from '@/common/store';
import { ref } from 'vue';
import RootEditor from './RootEditor.vue'

const filesStore = useFilesStore()
const selectedRoot = ref('');

const props = defineProps<{
    filename: string
}>()

function handleRootSelect(event: { id: unknown; value: boolean; path: unknown[] }): void {
    const id = event.id as string;
    selectedRoot.value = id;
}
</script>

<style scoped>
.file-editor {
    display: grid;
    grid-template-columns: 160px auto;
    height: calc(100vh - 112px);
}

p {
    margin: 24px;
    font-size: 24px;
}
</style>