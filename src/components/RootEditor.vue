<template>
    <div class="editor" v-if="root !== null">
        <!-- <p>{{ filesStore.files.get(props.filename)?.find(r => r.root === props.root) }}</p> -->
        <v-text-field label="Root" hide-details="auto" v-model="root.root"></v-text-field>
        <v-text-field label="Refers" hide-details="auto" v-model="root.refers"></v-text-field>
        <v-text-field label="See" hide-details="auto" v-model="root.see"></v-text-field>
        <v-textarea label="Notes" hide-details="auto" :no-resize="true" v-model="root.notes"></v-textarea>
        <v-switch v-model="stemsSingleLine[0]" label="Stem 1 Single Line"></v-switch>
        <v-text-field label="Stem 1" hide-details="auto" v-if="stemsSingleLine[0]" v-model="root.stems![0]"></v-text-field>
        <div v-else>
            <v-text-field label="Stem 1 BCS" hide-details="auto" v-model="(root.stems![0] as Specs).BSC"></v-text-field>
            <v-text-field label="Stem 1 CTE" hide-details="auto" v-model="(root.stems![0] as Specs).CTE"></v-text-field>
            <v-text-field label="Stem 1 CSV" hide-details="auto" v-model="(root.stems![0] as Specs).CSV"></v-text-field>
            <v-text-field label="Stem 1 OBJ" hide-details="auto" v-model="(root.stems![0] as Specs).OBJ"></v-text-field>
        </div>
        <v-switch v-model="stemsSingleLine[1]" label="Stem 2 Single Line"></v-switch>
        <v-text-field label="Stem 2" hide-details="auto" v-if="stemsSingleLine[1]" v-model="root.stems![1]"></v-text-field>
        <div v-else>
            <v-text-field label="Stem 2 BCS" hide-details="auto" v-model="(root.stems![1] as Specs).BSC"></v-text-field>
            <v-text-field label="Stem 2 CTE" hide-details="auto" v-model="(root.stems![1] as Specs).CTE"></v-text-field>
            <v-text-field label="Stem 2 CSV" hide-details="auto" v-model="(root.stems![1] as Specs).CSV"></v-text-field>
            <v-text-field label="Stem 2 OBJ" hide-details="auto" v-model="(root.stems![1] as Specs).OBJ"></v-text-field>
        </div>
        <v-switch v-model="stemsSingleLine[2]" label="Stem 3 Single Line"></v-switch>
        <v-text-field label="Stem 3" hide-details="auto" v-if="stemsSingleLine[2]" v-model="root.stems![2]"></v-text-field>
        <div v-else>
            <v-text-field label="Stem 3 BCS" hide-details="auto" v-model="(root.stems![2] as Specs).BSC"></v-text-field>
            <v-text-field label="Stem 3 CTE" hide-details="auto" v-model="(root.stems![2] as Specs).CTE"></v-text-field>
            <v-text-field label="Stem 3 CSV" hide-details="auto" v-model="(root.stems![2] as Specs).CSV"></v-text-field>
            <v-text-field label="Stem 3 OBJ" hide-details="auto" v-model="(root.stems![2] as Specs).OBJ"></v-text-field>
        </div>
        <v-btn color="red" class="delete-button" @click="deleteThisRoot">
            Delete This Root
        </v-btn>
    </div>
    <p class="placeholder" v-else>Please select or create a root to edit.</p>
</template>

<script lang="ts" setup>
import { useFilesStore } from '@/common/store';
import { Ref, reactive, ref, watch } from 'vue';
import { Root, Specs } from '@/common/typings';

const props = defineProps<{
    filename: string,
    rootStr: string | undefined
}>();

const filesStore = useFilesStore();
const stemsSingleLine = reactive([false, false, false]);
const root: Ref<Root | null> = ref(null);

watch(props, () => {
    if (props.rootStr === undefined) {
        return;
    }
    root.value = filesStore.files.get(props.filename)!.find(r => r.root === props.rootStr)!;
    if (root.value!.stems === undefined) root.value!.stems = ['', '', ''];
    stemsSingleLine[0] = typeof root.value!.stems[0] === 'string';
    stemsSingleLine[1] = typeof root.value!.stems[1] === 'string';
    stemsSingleLine[2] = typeof root.value!.stems[2] === 'string';
}, { immediate: true })

function deleteThisRoot() {
    const file = filesStore.files.get(props.filename)!;
    const index = file.findIndex(r => r.root === props.rootStr);
    file.splice(index, 1);
    root.value = null;
}
</script>

<style scoped>
.editor {
    padding: 24px;
    overflow-y: scroll;
}

.v-switch {
    height: 56px;
    margin-top: 22px;
}

.delete-button {
    margin: 24px 0 0 0
}

.placeholder {
    margin: 24px;
    font-size: 24px;
}
</style>