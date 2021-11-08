import axios from "axios";
import snackbar from "@/store/Snackbar";

export const state =
    {
        products: [],
        dialogClose: 0,
        newProduct: '',
        editProduct: '',
        editIndex: -1,
        deleteProduct: '',
        homeProducts: '',
        productProducts: '',
    }

export const getters = {

    showProducts: (state) => {
        return state.products;
    },
    showHomeProducts: (state) => {
        return state.homeProducts;
    },
    getDialogClose: (state) => {
        return state.dialogClose;
    },
    showProductProducts: (state) => {
        return state.productProducts;
    }
}
export const mutations = {
    setProduct(state) {
        state.editIndex = state.products.findIndex(x => x.id === state.editProduct.id);
        if (state.editIndex > -1) {
            Object.assign(state.products[state.editIndex], state.editProduct)
        }
    },
    setRemoveProduct(state) {
        state.editIndex = state.products.findIndex(x => x.id === state.deleteProduct.id);
        if (state.editIndex > -1) {
            state.products.splice(state.editIndex, 1);
        }
    },
}
export const actions = {
    getProducts({state}) {
        axios.get('/api/products')
            .then(res => {
                    state.products = res.data.data
                }
            )
    },
    pullHomeProducts({state}) {
        axios.get('/api/homeProducts')
            .then(res => {
                    state.homeProducts = res.data.data
                }
            )
    },
    pullProductProducts({state}) {
        axios.get('/api/productProducts')
            .then(res => {
                    state.productProducts = res.data.data
                }
            )
    },

    createProduct({state, dispatch, commit}, newProduct) {
        state.dialogClose = 0;
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        state.newProduct = newProduct;
        console.log(state.newProduct);

        axios.post(`/api/products`, state.newProduct)
            .then(res => {
                if (res) {
                    state.dialogClose = 1
                    snackbar.state.snackbar.condition = true
                    snackbar.state.snackbar.message = 'New Product Created'
                    dispatch('getProducts')
                }


            })
            .catch(error =>
                commit('setContactPersonCreateErrorMessage', error.response.data.errors)
            )

    },
    editProduct({state, commit}, editProduct) {
        state.dialogClose = 0;
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        state.editProduct = editProduct;

        axios.put(`/api/product/${state.editProduct.id}`, state.editProduct)
            .then(res => {
                if (res) {
                    state.dialogClose = 1
                    snackbar.state.snackbar.condition = true
                    snackbar.state.snackbar.message = 'Product Updated'
                    commit('setProduct')
                }


            })
    },
    deleteProduct({state, commit}, data) {
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        state.deleteProduct = data;
        axios.delete(`/api/product/${state.deleteProduct.id}`)
            .then(res => {
                if (res) {
                    commit('setRemoveProduct');
                    snackbar.state.snackbar.condition = true;
                    snackbar.state.snackbar.message = 'Product Deleted';
                }
            })
    },
}

export default {
    state,
    getters,
    mutations,
    actions
};