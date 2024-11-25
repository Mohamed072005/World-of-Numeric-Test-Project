<template>
  <div class="p-6 space-y-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Tableau de bord</h1>

    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
    <div v-else-if="error || productsError" class="text-red-500 text-center p-4 bg-red-100 dark:bg-red-900 rounded-lg">
      {{ error || productsError }}
    </div>
    <div v-else class="space-y-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white">Ventes totales</h2>
            <select 
              class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              v-model="selectedTime">
              <option value="1000">Toutes les ventes</option>
              <option value="7">7 derniers jours</option>
              <option value="30">30 derniers jours</option>
              <option value="365">Cette année</option>
            </select>
          </div>
          <p class="text-3xl font-bold text-blue-600 dark:text-blue-400">{{ totalSales }} ventes</p>
        </div>
        <div class="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Top Produits</h2>
          <ul class="space-y-2">
            <li v-for="product in topProducts" :key="product._id" class="flex justify-between items-center">
              <span class="text-gray-700 dark:text-gray-300">{{ product.name }}</span>
              <span class="font-semibold text-blue-600 dark:text-blue-400">{{ product.salesCount }} ventes</span>
            </li>
          </ul>
        </div>
        <div class="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Répartition par catégorie</h2>
          <CategoryChart :data="categoryData" />
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <h2
          class="text-xl font-semibold text-gray-800 dark:text-white p-6 border-b border-gray-200 dark:border-gray-700">
          Tableau des produits</h2>
        <ProductTable :products="products" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import ProductTable from "./ProductTable.vue";
import CategoryChart from "./CategoryChart.vue";
import { fetchCategorys, fetchThereeProducts, fetchTotalSalesByTime } from "../../api/AxiosClient";

const store = useStore();
const totalSales = ref(0);
const selectedTime = ref("1000");
const topProducts = ref([]);
const categoryData = ref([]);
const error = ref('');

const products = computed(() => store.getters["products/products"]);
const loading = computed(() => store.getters["products/loading"]);
const productsError = computed(() => store.getters["products/error"]);

const loadProducts = async () => {
  await store.dispatch('products/fetchProducts');
};

const fetchThreeTrendingProducts = async () => {
  try {
    const response = await fetchThereeProducts();
    topProducts.value = response.data.products;
  } catch (err: any) {
    error.value = err.message;
  }
};

const getchTotalSales = async () => {
  try{
    const response = await fetchTotalSalesByTime(selectedTime.value);
    totalSales.value = response.data.sales;
  }catch(err: any){
    error.value = err.message;
  }
}

const fetchCategorysStatistiques = async () => {
  try {
    const response = await fetchCategorys();
    categoryData.value = response.data.categorys;
  } catch (err: any) {
    error.value = err.message;
  }
};

watch(selectedTime, async () => {
  await getchTotalSales();
})

onMounted(async () => {
  await loadProducts();
  await getchTotalSales()
  await fetchThreeTrendingProducts();
  await fetchCategorysStatistiques();
});
</script>