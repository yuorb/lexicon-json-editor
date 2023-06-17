<template>
    <div class="file-editor">
        <v-list :items="filesStore.files.get(props.filename)?.map(({ root }) => ({ title: `${root}`, value: root }))"
            @click:select="handleRootSelect"></v-list>
        <RootEditor :filename="filename" :rootStr="selectedRoot"></RootEditor>
    </div>
</template>

<script setup lang="ts">
import { useFilesStore } from '@/common/store';
import { Ref, ref } from 'vue';
import RootEditor from './RootEditor.vue'

const filesStore = useFilesStore()
const selectedRoot: Ref<string | undefined> = ref(undefined);

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
</style>