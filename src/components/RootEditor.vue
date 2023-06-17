<template>
    <div class="editor">
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
</template>

<script lang="ts" setup>
import { useFilesStore } from '@/common/store';
import { computed } from '@vue/reactivity';
import { reactive, watch } from 'vue';
import { Specs } from '@/common/typings';

const props = defineProps<{
    filename: string,
    rootStr: string
}>();

const filesStore = useFilesStore();
const stemsSingleLine = reactive([false, false, false]);

const root = computed(() => {
    const root = filesStore.files.get(props.filename)!.find(r => r.root === props.rootStr)!;
    if (root.stems === undefined) root.stems = ['', '', ''];
    return root;
})

watch(props, () => {
    const stems = filesStore.files.get(props.filename)?.find(r => r.root === props.rootStr)?.stems;
    if (stems === undefined) return;
    stemsSingleLine[0] = typeof stems[0] === 'string';
    stemsSingleLine[1] = typeof stems[1] === 'string';
    stemsSingleLine[2] = typeof stems[2] === 'string';
})

function deleteThisRoot() {
    alert('Work In Progress')
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
</style>