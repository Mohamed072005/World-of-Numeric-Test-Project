<template>
    <nav class="bg-blue-600 text-white shadow-lg">
        <div class="container mx-auto px-4 flex items-center justify-between h-16">
            <div class="text-2xl font-bold">
                <RouterLink to="/" class="hover:text-blue-300">Dashboard</RouterLink>
            </div>
            <button class="block md:hidden p-2 rounded text-blue-300 hover:bg-blue-700 focus:outline-none focus:ring"
                @click="isMenuOpen = !isMenuOpen">
                <span class="sr-only">Open Menu</span>
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>
        </div>
    </nav>
</template>

<script lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

export default {
    name: "Navbar",
    components: { RouterLink },
    setup() {
        const isMenuOpen = ref(false);
        return { isMenuOpen };
    },
};
</script>

<style scoped>
</style>