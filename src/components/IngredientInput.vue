<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const emit = defineEmits<{
  addIngredient: [name: string];
}>();

const newIngredient = ref("");

const handleSubmit = () => {
  if (newIngredient.value.trim()) {
    emit("addIngredient", newIngredient.value.trim());
    newIngredient.value = "";
  }
};
</script>

<template>
  <form class="mb-6 sm:mb-8" @submit.prevent="handleSubmit">
    <div class="flex gap-3">
      <div class="flex-1 relative group">
        <input
          v-model="newIngredient"
          type="text"
          placeholder="Add an ingredient..."
          class="w-full px-4 sm:px-5 py-3 sm:py-4 text-gray-900 bg-white border border-gray-300 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 placeholder-gray-400 text-sm sm:text-base shadow-md hover:shadow-lg hover:border-green-400"
        />
      </div>
      <button
        type="submit"
        class="px-3 sm:px-8 py-3 sm:py-4 text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl sm:rounded-2xl hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300 font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/50 hover:scale-105 active:scale-95 text-sm sm:text-base group flex-shrink-0"
        aria-label="Add ingredient"
      >
        <Icon
          icon="mdi:plus-circle"
          class="text-xl sm:text-2xl transition-transform duration-300 group-hover:rotate-90"
        />
        <span class="hidden sm:inline">Add Ingredient</span>
      </button>
    </div>
  </form>
</template>

