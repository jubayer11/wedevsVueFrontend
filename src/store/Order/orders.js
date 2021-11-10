import axios from "axios";
import snackbar from "@/store/Snackbar";
import router from "@/router";

export const state =
    {
        orderProduct: '',
        userId: '',
    }

export const getters = {}
export const mutations = {}
export const actions = {
    orderProduct({state}, orderProduct) {
        state.orderProduct = orderProduct.data;
        state.userId = orderProduct.userId;
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';

        axios.post(`/api/order`, {orderProduct:state.orderProduct,userId:state.userId})
            .then(res => {
                if (res) {
                    snackbar.state.snackbar.condition = true
                    snackbar.state.snackbar.message = 'New order has placed'
                    router.push({
                        name: 'myOrders',
                    })
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