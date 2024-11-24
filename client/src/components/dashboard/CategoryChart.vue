<template>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
        <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Ventes par catégorie</h2>
        <div v-if="!data" class="w-full flex justify-center">
            <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div v-else>
            <canvas :id="chartId"></canvas>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import Chart from 'chart.js/auto';

interface CategoryData {
    totalSales: number;
    category: string;
    percentage: number;
}

export default defineComponent({
    name: 'CategoryChart',
    props: {
        data: {
            type: Array as () => CategoryData[],
            required: true
        }
    },
    setup(props) {
        const chartInstance = ref<Chart | null>(null);
        const chartId = `chart-${Math.random().toString(36).substring(2, 15)}`; // Générer un ID unique

        const createChart = () => {
            const canvas = document.getElementById(chartId) as HTMLCanvasElement;

            // Détruire l'instance existante du graphique
            if (chartInstance.value) {
                chartInstance.value.destroy();
                chartInstance.value = null;
            }

            // Créer une nouvelle instance du graphique
            chartInstance.value = new Chart(canvas, {
                type: 'bar',
                data: {
                    labels: props.data.map((item) => item.category),
                    datasets: [
                        {
                            label: 'Ventes totales',
                            data: props.data.map((item) => item.totalSales),
                            backgroundColor: ['#4caf50', '#2196f3', '#ffc107', '#f44336', '#9c27b0'],
                            borderColor: '#fff',
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: (context) => `${(context.raw as number).toLocaleString()} €`,
                            },
                        },
                        legend: {
                            display: true,
                            position: 'top',
                        },
                    },
                },
            });
        };

        onMounted(() => {
            createChart();
        });

        watch(() => props.data, () => {
            createChart();
        });

        return {
            chartId,
        };
    }
});
</script>