import axios from 'axios'
const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})


export const fetchProducts = () => axiosClient.get('/products');
export const fetchThereeProducts = () => axiosClient.get('/analytics/trending_products');
export const fetchCategorys = () => axiosClient.get('/analytics/category_sales');
export const fetchTotalSalesByTime = (time: string) => axiosClient.get(`/analytics/total_sales/${time}`)