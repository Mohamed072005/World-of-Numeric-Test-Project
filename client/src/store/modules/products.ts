import { fetchProducts } from "../../api/AxiosClient";

export default {
    namespaced: true,
    state: {
        products: [],
        loading: false,
        error: null
    },
    mutations: {
        SET_PRODUCTS(state, products) {
            state.products = products
        },
        PRODUCTS_LOADING(state, loading){
            state.loading = loading;
        },
        SET_ERROR(state, error){
            state.error = error
        }
    },
    actions: {
        async fetchProducts({ commit }){
            commit("PRODUCTS_LOADING", true);
            commit("SET_ERROR", null);
            try{
                const response = await fetchProducts();
                commit("SET_PRODUCTS", response.data.products);
            }catch (err: any){
                commit("SET_ERROR", err.message);
            }finally{
                commit('PRODUCTS_LOADING', false)
            }
        }
    },
    getters: {
        products: (state) => state.products,
        loading: (state) => state.loading,
        error: (state) => state.error
    }
}