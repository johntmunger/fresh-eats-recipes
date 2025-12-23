<script setup lang="ts">
import type { Ingredient } from "../types/ingredient";
import { Icon } from "@iconify/vue";
import IngredientItem from "./IngredientItem.vue";

defineProps<{
  ingredients: Ingredient[];
}>();

const emit = defineEmits<{
  update: [id: number, name: string];
  delete: [id: number];
}>();
</script>

<template>
  <div v-if="ingredients.length > 0" class="mb-6 sm:mb-8">
    <!-- Two-column grid layout -->
    <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 max-h-[60vh] overflow-y-auto pr-1 sm:pr-2">
      <IngredientItem
        v-for="(ingredient, index) in ingredients"
        :key="ingredient.id"
        :ingredient="ingredient"
        :style="{ animationDelay: `${index * 50}ms` }"
        @update="(id, name) => emit('update', id, name)"
        @delete="emit('delete', $event)"
      />
    </ul>
  </div>
  <div v-else class="text-center py-12 sm:py-16 text-gray-400 animate-scale-in">
    <div class="relative inline-block mb-4">
      <Icon
        icon="mdi:shopping-outline"
        class="text-6xl sm:text-7xl mx-auto opacity-30 animate-pulse"
      />
      <div class="absolute inset-0 blur-xl bg-green-500/5 animate-pulse"></div>
    </div>
    <p
      class="text-base sm:text-lg font-medium text-gray-600"
    >
      No ingredients yet. Add one above!
    </p>
    <p class="text-xs sm:text-sm text-gray-500 mt-2">Start building your shopping list</p>
  </div>
</template>

