import axios from "../axios-default";
import snackbar from "@/store/Snackbar";
import router from "@/router";
import store from "@/store";

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
        totalPrice: 0,

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
        state.totalPrice = 0;
        Object.keys(state.cartProduct).forEach(function (key) {
            state.totalPrice += (parseInt(state.cartProduct[key].customerQuantity) * parseInt(state.cartProduct[key].price));

            state.cartProduct[key].quantity = parseInt(state.cartProduct[key].quantity) - parseInt(state.cartProduct[key].customerQuantity);
            if (state.cartProduct[key].quantity == 0) {
                state.cartProduct[key].increment = true;
            }
            if (state.cartProduct[key].selectedQuantity == 0) {
                state.cartProduct[key].decrement = true;
            }
        })
    },
    setRemoveCartProduct(state) {
        state.cartCount -= 1;
        state.editIndex = state.cartProduct.findIndex(x => x.id === state.cartDeleteProduct.id);
        if (state.editIndex > -1) {
            state.cartProduct.splice(state.editIndex, 1);
        }
    },
}
export const actions = {
    getProductCartCount({state}, userId) {
        state.userId = userId.userId;

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
        if (store.getters['authentication/isAuthenticated'])
        {
            snackbar.state.snackbar.condition = false;
            snackbar.state.snackbar.message = '';
            state.cart.productId = cart.productId;
            state.cart.UserId = cart.userId;
            state.cart.quantity = cart.quantity;
            state.UserId = state.cart.UserId;

            axios.post(`/api/cart`, state.cart)
                .then(res => {
                    if (res) {
                        state.cartCount += 1;
                        snackbar.state.snackbar.condition = true
                        snackbar.state.snackbar.message = 'New Product Added to cart'
                        dispatch('getProductCartCount', {userId: state.userId});
                    }
                })
        }
        else
        {
            router.push({
                name: 'authentication/LoginPage',
            })
        }

    },
    detachCartProduct({state, commit}, data) {
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        state.cartDeleteProduct = data.product;
        axios.delete(`/api/cart/${state.cartDeleteProduct.id}`)
            .then(res => {
                if (res) {
                    state.totalPrice -= (parseInt(state.cartDeleteProduct.customerQuantity) * parseInt(state.cartDeleteProduct.price));
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
                    state.cartCount = 0;
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