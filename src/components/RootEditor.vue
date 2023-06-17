<template>
    <div class="editor">
        <!-- <p>{{ filesStore.files.get(props.filename)?.find(r => r.root === props.root) }}</p> -->
        <v-text-field label="Root" hide-details="auto"></v-text-field>
        <v-text-field label="Refers" hide-details="auto"></v-text-field>
        <v-text-field label="See" hide-details="auto"></v-text-field>
        <v-textarea label="Notes" hide-details="auto" :no-resize="true"></v-textarea>
        <v-switch v-model="stemsSingleLine[0]" label="Stem 1 Single Line"></v-switch>
        <v-text-field label="Stem 1" hide-details="auto" v-if="stemsSingleLine[0]"></v-text-field>
        <div v-else>
            <v-text-field label="Stem 1 BCS" hide-details="auto"></v-text-field>
            <v-text-field label="Stem 1 CTE" hide-details="auto"></v-text-field>
            <v-text-field label="Stem 1 CSV" hide-details="auto"></v-text-field>
            <v-text-field label="Stem 1 OBJ" hide-details="auto"></v-text-field>
        </div>
        <v-switch v-model="stemsSingleLine[1]" label="Stem 2 Single Line"></v-switch>
        <v-text-field label="Stem 2" hide-details="auto" v-if="stemsSingleLine[1]"></v-text-field>
        <div v-else>
            <v-text-field label="Stem 2 BCS" hide-details="auto"></v-text-field>
            <v-text-field label="Stem 2 CTE" hide-details="auto"></v-text-field>
            <v-text-field label="Stem 2 CSV" hide-details="auto"></v-text-field>
            <v-text-field label="Stem 2 OBJ" hide-details="auto"></v-text-field>
        </div>
        <v-switch v-model="stemsSingleLine[2]" label="Stem 3 Single Line"></v-switch>
        <v-text-field label="Stem 3" hide-details="auto" v-if="stemsSingleLine[2]"></v-text-field>
        <div v-else>
            <v-text-field label="Stem 3 BCS" hide-details="auto"></v-text-field>
            <v-text-field label="Stem 3 CTE" hide-details="auto"></v-text-field>
            <v-text-field label="Stem 3 CSV" hide-details="auto"></v-text-field>
            <v-text-field label="Stem 3 OBJ" hide-details="auto"></v-text-field>
        </div>
        <v-btn
          color="red"
          class="delete-button"
          @click="deleteThisRoot"
        >
          Delete This Root
        </v-btn >
    </div>
</template>

<script lang="ts" setup>
import { useFilesStore } from '@/common/store';
import { reactive } from 'vue';

const props = defineProps<{
    filename: string,
    root: string
}>();

const filesStore = useFilesStore();
const stemsSingleLine = reactive([false, false, false]);

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