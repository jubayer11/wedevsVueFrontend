import axios from "../axios-default";
import snackbar from "@/store/Snackbar";
import router from "@/router";

export const state =
    {
        orderProduct: '',
        userId: '',
        address: '',
        myOrder: [],
        cloneMyOrder: [],
        orderId: '',
        orderView: '',
        orderDeleteProduct: '',
        totalPrice: 0,
        orderHistory: '',
        allOrders: [],
        editOrder: '',
        editIndex: -1,
        editDialog: 0,
        status: null,
    }

export const getters = {
    pullMyOrder: (state) => {
        return state.myOrder;
    },
    pullAllOrder: (state) => {
        return state.allOrders;
    },
    showOrderView: (state) => {
        return state.orderView;
    },
    showOrderHistory: (state) => {
        return state.orderHistory;
    },
    getEditOrderDialog: (state) => {
        return state.editDialog;
    }


}
export const mutations = {
    setOrderView(state) {
        state.totalPrice = 0;
        Object.keys(state.orderView).forEach(function (key) {
            state.orderView[key].quantity = parseInt(state.orderView[key].quantity) - parseInt(state.orderView[key].customerQuantity);
            state.totalPrice += (parseInt(state.orderView[key].customerQuantity) * parseInt(state.orderView[key].price));
            console.log(state.totalPrice);
            if (state.orderView[key].quantity == 0) {
                state.orderView[key].increment = true;
            }
            if (state.orderView[key].customerQuantity == 0) {
                state.orderView[key].decrement = true;
            }
        })
    },
    setRemoveOrderProduct(state) {
        state.editIndex = state.orderView.findIndex(x => x.id === state.orderDeleteProduct.id);
        if (state.editIndex > -1) {
            state.orderView.splice(state.editIndex, 1);
        }
    },
    setEditOrder(state) {
        state.editIndex = state.allOrders.findIndex(x => x.id === state.editOrder.id);
        if (state.editIndex > -1) {
            Object.assign(state.allOrders[state.editIndex], state.editOrder)
        }
    },
    filterOrder(state, status) {
        state.status = status.status;
        state.myOrder = state.cloneMyOrder;
        if (state.status!=5)
        {
            state.myOrder =  state.myOrder.filter((el) => {
                return (el.status==state.status);
            });
        }


    },

}
export const actions = {
    orderProduct({state}, orderProduct) {
        state.orderProduct = orderProduct.data;
        state.userId = orderProduct.userId;
        state.address = orderProduct.address;
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';

        axios.post(`/api/order`, {orderProduct: state.orderProduct, userId: state.userId, address: state.address})
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
    showMyOrder() {
        router.push({
            name: 'myOrders',
        })
    },
    viewEditOrder({state}, order) {
        state.orderId = order.order.id;
        router.push({
            name: 'myOrdersView',
            params: {id: state.orderId, view: 1}
        })
    },
    viewViewOrder({state}, order) {
        state.orderId = order.order.id;
        router.push({
            name: 'myOrdersView',
            params: {id: state.orderId, view: 2}
        })
    },
    viewHistoryOrder({state}, order) {
        state.orderId = order.order.id;
        router.push({
            name: 'ordersHistoryMy',
            params: {id: state.orderId}
        })
    },
    getMyOrders({state}, data) {
        state.userId = data.userId
        axios.get(`/api/my/order/${state.userId}`)
            .then(res => {
                if (res) {
                    state.myOrder = res.data.data;
                    state.cloneMyOrder = res.data.data;
                }
            })
    },
    getAllOrders({state}) {
        axios.get(`/api/order/all`)
            .then(res => {
                if (res) {
                    state.allOrders = res.data.data;
                }
            })
    },
    getOrderView({state, commit}, orderId) {
        state.orderId = orderId.id;
        axios.get(`api/my/order/product/${state.orderId}`)
            .then(res => {
                    state.orderView = res.data.data
                    commit('setOrderView');
                }
            )
    },
    getOrderHistory({state}, orderId) {
        state.orderId = orderId.id;
        axios.get(`api/order/history/${state.orderId}`)
            .then(res => {
                    state.orderHistory = res.data.data;


                }
            )
    },
    detachOrderProduct({state, commit}, data) {
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        state.orderDeleteProduct = data.product;
        axios.delete(`api/my/order/product/${state.orderDeleteProduct.id}`)
            .then(res => {
                if (res) {
                    state.totalPrice -= (parseInt(state.orderDeleteProduct.customerQuantity) * parseInt(state.orderDeleteProduct.price));
                    commit('setRemoveOrderProduct');
                    snackbar.state.snackbar.condition = true;
                    snackbar.state.snackbar.message = 'Item Deleted From Order';
                }
            })
    },
    saveUpdatedOrder({state}) {
        axios.post(`/api/order/update`, {updateProduct: state.orderView})
            .then(res => {
                if (res) {
                    router.push({
                        name: 'myOrders',
                    })
                }
            })

    },
    editOrder({state, commit}, data) {
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        state.editDialog = 0;
        state.editOrder = data;
        axios.put(`/api/order/edit/${state.editOrder.id}`, {status: state.editOrder.status})
            .then(res => {
                if (res) {
                    commit('setEditOrder');
                    state.editDialog = 1;
                    snackbar.state.snackbar.condition = true;
                    snackbar.state.snackbar.message = 'Order Status has Changed';
                }
            })
    }

}

export default {
    state,
    getters,
    mutations,
    actions
};