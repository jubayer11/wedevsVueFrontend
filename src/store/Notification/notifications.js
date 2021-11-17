import axios from "../axios-default";

export const state =
    {
        userId: null,
        notifications: '',
        countUnreadNotification: 0,
        dashBoardData: '',
    }
export const getters =
    {
        showNotification: (state) => {
            return state.notifications;
        },
        getCountUnreadNotification: (state) => {
            return state.countUnreadNotification;
        },
        pullDashboardData: (state) => {
            return state.dashBoardData;
        },
    }
export const mutations = {}
export const actions = {
    getNotifications({state}, userId) {
        state.userId = userId;
        axios.get(`/api/user/${state.userId}/notification`)
            .then(res => {
                    state.notifications = res.data;
                    state.countUnreadNotification = res.data.unread.length;
                }
            )
    },
    markReadNotifications({state, dispatch}, userId) {
        state.userId = userId;
        axios.get(`/api/user/${state.userId}/notification/markRead`)
            .then(res => {
                    if (res) {
                        dispatch('getNotifications', state.userId);
                    }
                }
            )
    },
    getDashboardData({state}) {
        axios.get(`/api/wedevs`)
            .then(res => {
                    if (res) {
                        state.dashBoardData = res.data;
                    }
                }
            )
    }
}
export default {
    state,
    getters,
    mutations,
    actions
};