import axios from "axios";
import snackbar from "@/store/Snackbar";
import router from "@/router";

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
        cartDeleteProduct: '',
        editIndex: -1,

    }

export const getters = {
    getCartCount: (state) => {
        return state.cartCount;
    },
    showCartProduct: (state) => {
        return state.cartProduct;
    },
}
export const mutations = {
    setGetCartProduct(state) {

        Object.keys(state.cartProduct).forEach(function (key) {
            state.cartProduct[key].quantity=parseInt(state.cartProduct[key].quantity) - parseInt(state.cartProduct[key].customerQuantity);
            if (state.cartProduct[key].quantity == 0) {
                state.cartProduct[key].increment = true;
            }
            if (state.cartProduct[key].selectedQuantity == 0) {
                state.cartProduct[key].decrement = true;
            }
        })
    },
    setRemoveCartProduct(state) {
        state.editIndex = state.cartProduct.findIndex(x => x.id === state.cartDeleteProduct.id);
        if (state.editIndex > -1) {
            state.cartProduct.splice(state.editIndex, 1);
        }
    },
}
export const actions = {
    getProductCartCount({state}, userId) {
        state.userId = userId.userId;
        console.log('cart count bullshit', state.userId);

        axios.get(`/api/cart/count/${state.userId}`)
            .then(res => {
                    state.cartCount = res.data;
                    console.log(state.cartCount);
                }
            )
    },
    getCartProduct({state, commit}, userId) {
        state.userId = userId.userId;
        axios.get(`/api/cart/${state.userId}`)
            .then(res => {
                    state.cartProduct = res.data.data;
                    commit('setGetCartProduct');
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
                    dispatch('getProductCartCount', {userId: state.userId});
                }
            })
    },
    detachCartProduct({state, commit}, data) {
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        state.cartDeleteProduct = data.product;
        axios.delete(`/api/cart/${state.cartDeleteProduct.id}`)
            .then(res => {
                if (res) {
                    commit('setRemoveCartProduct');
                    snackbar.state.snackbar.condition = true;
                    snackbar.state.snackbar.message = 'Item Deleted From Cart';
                }
            })
    },
    viewCart() {
        router.push({
            name: 'cartView',
        })
    },
    viewCheckOut({state}) {
        axios.post(`/api/cart/update`, {cartProduct: state.cartProduct})
            .then(res => {
                if (res) {
                    router.push({
                        name: 'checkoutView',
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