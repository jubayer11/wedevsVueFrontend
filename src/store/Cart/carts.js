import axios from "axios";
import snackbar from "@/store/Snackbar";

export const state =
    {
        cart: {
            productId: '',
            userId: '',
            quantity: '',
        },
        cartCount: 0,
        userId: 1,
        cartProduct: '',

    }

export const getters = {
    getCartCount: (state) => {
        return state.cartCount;
    }
}
export const mutations = {}
export const actions = {
    getProductCartCount({state}) {
        axios.get(`/api/cart/count/${state.userId}`)
            .then(res => {
                    state.cartCount = res.data;
                    console.log(state.cartCount);
                }
            )
    },
    addToCart({state, dispatch}, cart) {
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        state.cart.productId = cart.productId;
        state.cart.UserId = cart.userId;
        state.cart.quantity = cart.quantity;
        state.UserId = state.cart.UserId;
        axios.post(`/api/cart`, state.cart)
            .then(res => {
                if (res) {
                    snackbar.state.snackbar.condition = true
                    snackbar.state.snackbar.message = 'New Product Added to cart'
                    dispatch('getProductCartCount');
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