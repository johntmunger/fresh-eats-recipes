<script setup lang="ts">
import { ref } from "vue";
import type { Recipe } from "../types/ingredient";
import { Icon } from "@iconify/vue";

defineProps<{
  ingredientCount: number;
  recipeCount: number;
  recipes: Recipe[];
}>();

const emit = defineEmits<{
  saveRecipe: [];
  loadRecipe: [recipe: Recipe];
}>();

const showRecipesDropdown = ref(false);
</script>

<template>
  <div class="mb-6 sm:mb-8">
    <!-- Stats Row -->
    <div class="flex items-center justify-between mb-3 sm:mb-4 px-2 text-xs sm:text-sm">
      <div class="flex items-center gap-2 group">
        <div class="relative">
          <Icon
            icon="mdi:shopping"
            class="text-base sm:text-lg text-green-600 group-hover:scale-110 transition-transform duration-300"
          />
          <div
            class="absolute inset-0 blur-md bg-green-600/10 group-hover:bg-green-600/20 transition-all duration-300"
          ></div>
        </div>
        <span
          class="font-semibold text-gray-300 group-hover:text-white transition-colors duration-300"
        >
          <span class="text-green-600 text-base sm:text-lg">{{ ingredientCount }}</span>
          <span class="hidden sm:inline ml-1">
            {{ ingredientCount === 1 ? "ingredient" : "ingredients" }}
          </span>
          <span class="sm:hidden ml-1">items</span>
        </span>
      </div>

      <div class="flex items-center gap-2 group">
        <span
          class="font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300"
        >
          <span class="text-emerald-600 text-base sm:text-lg">{{ recipeCount }}</span>
          <span class="hidden sm:inline ml-1">
            {{ recipeCount === 1 ? "recipe saved" : "recipes saved" }}
          </span>
          <span class="sm:hidden ml-1">saved</span>
        </span>
        <div class="relative">
          <Icon
            icon="mdi:chef-hat"
            class="text-base sm:text-lg text-emerald-600 group-hover:scale-110 transition-transform duration-300"
          />
          <div
            class="absolute inset-0 blur-md bg-emerald-600/10 group-hover:bg-emerald-600/20 transition-all duration-300"
          ></div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex gap-2 sm:gap-4 justify-center">
      <button
        class="flex-1 sm:flex-initial px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl transition-all duration-300 font-semibold flex items-center justify-center gap-2 text-xs sm:text-sm border bg-gradient-to-r from-green-600 to-emerald-600 text-white border-green-500 shadow-lg shadow-green-500/50 hover:from-green-700 hover:to-emerald-700 hover:scale-105"
        :disabled="ingredientCount === 0"
        :class="ingredientCount === 0 ? 'opacity-50 cursor-not-allowed' : ''"
        @click="emit('saveRecipe')"
      >
        <Icon icon="mdi:content-save" class="text-base sm:text-xl" />
        <span>Save for Recipe</span>
      </button>

      <!-- Saved Recipes Dropdown -->
      <div class="relative flex-1 sm:flex-initial">
        <button
          class="w-full px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl transition-all duration-300 font-semibold flex items-center justify-center gap-2 text-xs sm:text-sm border text-gray-700 bg-white/70 border-gray-300 hover:bg-white hover:border-gray-400 hover:text-gray-900 hover:scale-105 hover:shadow-lg"
          @click="showRecipesDropdown = !showRecipesDropdown"
        >
          <Icon icon="mdi:book-open-variant" class="text-base sm:text-xl" />
          <span>Saved Recipes</span>
          <Icon
            icon="mdi:chevron-down"
            class="text-base sm:text-xl transition-transform duration-300"
            :class="{ 'rotate-180': showRecipesDropdown }"
          />
        </button>

        <!-- Dropdown Menu (Drop Up) -->
        <Transition name="dropdown">
          <div
            v-if="showRecipesDropdown && recipes.length > 0"
            class="absolute right-0 bottom-full mb-2 w-64 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden z-10 max-h-80 overflow-y-auto"
          >
            <button
              v-for="recipe in recipes"
              :key="recipe.id"
              class="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0 flex items-center gap-3"
              @click="
                emit('loadRecipe', recipe);
                showRecipesDropdown = false;
              "
            >
              <Icon icon="mdi:chef-hat" class="text-xl text-green-600 flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <div class="text-sm font-semibold text-gray-900 truncate">{{ recipe.name }}</div>
                <div class="text-xs text-gray-600">
                  {{ recipe.ingredients.length }}
                  {{ recipe.ingredients.length === 1 ? "ingredient" : "ingredients" }}
                </div>
              </div>
            </button>
          </div>
          <div
            v-else-if="showRecipesDropdown && recipes.length === 0"
            class="absolute right-0 bottom-full mb-2 w-64 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 z-10"
          >
            <p class="text-sm text-gray-600 text-center">No saved recipes yet</p>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

