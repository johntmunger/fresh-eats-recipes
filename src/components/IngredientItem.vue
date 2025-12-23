<script setup lang="ts">
import { ref, nextTick } from "vue";
import type { Ingredient } from "../types/ingredient";
import { Icon } from "@iconify/vue";

defineProps<{
  ingredient: Ingredient;
}>();

const emit = defineEmits<{
  update: [id: number, name: string];
  delete: [id: number];
}>();

const isEditing = ref(false);
const editValue = ref("");
const inputRef = ref<HTMLInputElement | null>(null);

const startEdit = (currentName: string) => {
  isEditing.value = true;
  editValue.value = currentName;
  nextTick(() => {
    inputRef.value?.focus();
    inputRef.value?.select();
  });
};

const saveEdit = (id: number) => {
  if (editValue.value.trim() && editValue.value.trim() !== "") {
    emit("update", id, editValue.value.trim());
  }
  isEditing.value = false;
};

const cancelEdit = () => {
  isEditing.value = false;
  editValue.value = "";
};

const handleBlur = (id: number) => {
  if (isEditing.value) {
    saveEdit(id);
  }
};

const handleKeydown = (event: KeyboardEvent, id: number) => {
  if (event.key === "Enter") {
    saveEdit(id);
  } else if (event.key === "Escape") {
    cancelEdit();
  }
};
</script>

<template>
  <li
    class="group flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gradient-to-r from-white/70 to-white/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl hover:shadow-gray-300/50 hover:from-white/90 hover:to-white transition-all duration-300 border border-gray-200 hover:border-green-300 animate-slide-in-up hover:scale-[1.02] active:scale-[0.98]"
  >
    <!-- Ingredient Icon -->
    <Icon
      icon="mdi:food-apple"
      class="flex-shrink-0 text-green-600 text-xl sm:text-2xl"
    />

    <!-- Ingredient Text or Input -->
    <div v-if="isEditing" class="flex-1">
      <input
        ref="inputRef"
        v-model="editValue"
        type="text"
        class="w-full px-2 py-1 text-sm sm:text-base text-gray-900 bg-white border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        @blur="handleBlur(ingredient.id)"
        @keydown="handleKeydown($event, ingredient.id)"
      />
    </div>
    <span
      v-else
      class="flex-1 text-sm sm:text-base transition-all duration-300 text-gray-800 group-hover:text-gray-900 truncate font-medium"
      :title="ingredient.name"
    >
      {{ ingredient.name }}
    </span>

    <!-- Action Buttons - Smaller secondary style -->
    <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <button
        v-if="!isEditing"
        class="flex-shrink-0 p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all duration-200"
        aria-label="Edit ingredient"
        title="Edit"
        @click="startEdit(ingredient.name)"
      >
        <Icon icon="mdi:pencil" class="text-base" />
      </button>
      <button
        class="flex-shrink-0 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-all duration-200"
        aria-label="Delete ingredient"
        title="Delete"
        @click="emit('delete', ingredient.id)"
      >
        <Icon icon="mdi:delete" class="text-base" />
      </button>
    </div>
  </li>
</template>

