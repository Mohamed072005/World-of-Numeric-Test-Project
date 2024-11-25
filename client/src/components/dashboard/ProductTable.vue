<template>
    <div class="overflow-x-auto flex justify-center my-3">
        <div class="w-[60%]">
            <table class="bg-white border border-gray-300 w-full">
                <thead>
                    <tr>
                        <th
                            class="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Catégorie
                        </th>
                        <th
                            class="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Nom du produit
                        </th>
                        <th
                            class="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Total Ventes Prix (€)
                        </th>
                        <th
                            class="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Date de vente
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in paginatedProducts" :key="product.totalRevenue" class="hover:bg-gray-50">
                        <th class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            {{ product.category }}
                        </th>
                        <th class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            {{ product.name }}
                        </th>
                        <th class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            €{{ product.totalRevenue.toFixed(2) }}
                        </th>
                        <th class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            {{ formatDate(product.salesDate) }}
                        </th>
                    </tr>
                </tbody>
            </table>
            <div class="flex justify-center mt-6">
                <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
                    class="px-4 py-2 mx-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                    &lt; Précédent
                </button>
                <span class="mx-4 mt-2 text-sm font-medium text-gray-600">Page {{ currentPage }} sur {{ totalPages
                    }}</span>
                <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
                    class="px-4 py-2 mx-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                    Suivant &gt;
                </button>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';

export default defineComponent({
    name: 'ProductTable',
    props: {
        products: {
            type: Array as PropType<{
                name: string;
                category: string;
                totalRevenue: number;
                salesDate: Date;
            }[]>,

            required: true,
        },
    },
    setup(props) {
        const itemsPerPage = 5;
        const currentPage = ref(1);

        const paginatedProducts = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage;
            return props.products.slice(start, start + itemsPerPage);
        });

        const totalPages = computed(() => Math.ceil(props.products.length / itemsPerPage));

        const changePage = (page: number) => {
            if (page >= 1 && page <= totalPages.value) {
                currentPage.value = page;
            }
        };

        const formatDate = (date: Date | string) => {
            const d = new Date(date);
            const options: Intl.DateTimeFormatOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };
            return d.toLocaleDateString('fr-FR', options); // Changed locale to French
        };

        return {
            formatDate,
            paginatedProducts,
            currentPage,
            totalPages,
            changePage
        };
    }
});
</script>
