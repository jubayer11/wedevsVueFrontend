import axios from "axios";

export const state =
    {
        users: [],
        checkUsers: [],
        user: 'check',
        shufflex: 'users',

    }

export const getters = {

    showUsers: (state) => {
        return state.checkUsers;
    },

}
export const mutations = {

    fetchUsersAdmin(state, payload) {
        state.checkUsers = state.users;
        state.shufflex = payload.user;
        if (state.shufflex == 'users') {

            state.checkUsers = state.users.filter((el) => {
                return (el.isStaff == 0);
            });
        }
        if (state.shufflex == 'staffUsers') {
            state.checkUsers = state.users.filter((el) => {
                return (el.isStaff == 1);
            });
        }
        if (state.shufflex == 'allUsers') {
            state.checkUsers = state.users.filter((el) => {
                return (el.isStaff == 0 || el.isStaff == 1);
            });

        }

    },

}
export const actions = {
    getUsers({state}) {
        axios.get('/api/users')
            .then(res => {
                    state.users = res.data.data
                    state.checkUsers = res.data.data
                    console.log('hello', state.users);
                }
            )
    },
}

export default {
    state,
    getters,
    mutations,
    actions
};