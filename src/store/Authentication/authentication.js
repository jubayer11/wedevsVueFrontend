import config from "@/config/index";
import axios from './axios-auth'
import globalAxios from '../axios-default'
import router from '../../router'
import snackbar from '../Snackbar/index'
import sidebar from "../../config/navigations/sidebar";

export const state = config.login;

export const getters = {
    user(state) {
        return state.user
    },
    errorMessage: (state) => {
        return state.errors;
    },
    isAuthenticated: (state) => {
        if (state.idToken !== null) {
            return true;
        } else {
            return false;
        }
    },
    isAdmin: (state) => {
        if (state.role == 'admin') {
            return true;
        } else {
            return false;
        }
    },
    getSnackBar: (state) => {
        return state.snackbar;
    },
    getUserRole: (state) => {
        return state.role;
    },
    getUserId: (state) => {
        return state.userId;
    },
    getStaff: (state) => {
        return state.isStaff;
    },
    getSignUpError: (state) => {
        return state.signUpError;
    },
    getSignUpSuccess: (state) => {
        return state.signUpSuccess;
    }

};
export const mutations = {
    checkingIsBase64(state) {
        state.isBase64 = true;
    },

    getError(state, loginErrors) {
        state.errors = loginErrors;
    },
    authUser(state, userData) {
        state.idToken = userData.token
        state.userId = userData.userId
        state.role = userData.role
        state.name = userData.name
        state.isStaff = userData.isStaff
        state.isSignup = userData.isSignup
    },
    storeUser(state, user) {
        state.user = user
    },
    clearAuthData(state) {
        state.errors = ''
        state.idToken = null
        state.userId = null
        state.role = null
        state.name = null
        state.isStaff = null
        localStorage.removeItem('expirationDate')
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('name')
        localStorage.removeItem('userRole')
        localStorage.removeItem('isStaff')
    },
};
export const actions = {

    setLogoutTimer({commit}, expirationTime) {
        setTimeout(() => {
            commit('clearAuthData')
        }, expirationTime)
    },
    isValid({state, dispatch}, token) {
        dispatch('payload', token)

        if (state.decoding != null) {
            const payload = state.decoding;
            if (payload.iss == "http://127.0.0.1:8000/api/auth/login") {
                state.condition = true;
            }
        }


    },
    payload({dispatch}, token) {
        const payload = token.split('.')[1]
        dispatch('decode', payload)

    },

    decode({state, dispatch}, payload) {
        dispatch('isBase64', payload)
        if (state.isBase64 == true) {
            state.decoding = JSON.parse(atob(payload))
        }
    },
    isBase64({commit}, str) {
        if (btoa(atob(str)).replace(/=/g, "") == str) {
            commit('checkingIsBase64')
        }
    },
    signUp({state}, data) {
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        state.newUser = data;
        state.signUpSuccess = 0;
        axios.post('/auth/signup', state.newUser)
            .then(res => {
                if (res) {

                    snackbar.state.snackbar.condition = true
                    snackbar.state.snackbar.message = 'You have successfully signed up'
                    state.signUpSuccess = 1;
                    state.signUpError = '';
                    router.push({name: 'authentication/LoginPage'})
                }
            })
            .catch(error => state.signUpError = error.response.data.errors)

    },
    login({state, commit, dispatch}, authData) {
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        axios.post('/auth/login', {

            email: authData.email,
            password: authData.password,
            rememberMe: authData.rememberMe,
            returnSecureToken: true,

        })
            .then(res => {

                const access_token = res.data.access_token;
                state.userId = res.data.userUniqueId;
                dispatch('isValid', access_token)
                if (state.condition == true) {
                    localStorage.setItem('token', res.data.access_token)
                    localStorage.setItem('token_type', res.data.token_type)
                    localStorage.setItem('userId', res.data.userUniqueId)
                    localStorage.setItem('expirationDate', res.data.expires_in)
                    localStorage.setItem('userRole', res.data.userRole)
                    localStorage.setItem('isStaff', res.data.isStaff)
                    localStorage.setItem('name', res.data.name)
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
                    globalAxios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
                    commit('authUser', {
                        token: res.data.idToken,
                        userId: res.data.userUniqueId,
                        role: res.data.userRole,
                        name: res.data.name,
                        isStaff: res.data.isStaff,
                        isSignup: res.data.isSignup,
                    })
                    dispatch('setLogoutTimer', res.data.expires_in)

                    if (state.isStaff == 1) {
                        sidebar.show = true;
                        router.push({name: 'Dashboard'})
                    } else {
                        sidebar.show = false;
                        router.push({
                            name: 'Home',

                        })

                    }
                    setTimeout(() => {
                        snackbar.state.snackbar.condition = true;
                        snackbar.state.snackbar.message = 'Signed In Successfully';
                    }, 2)
                }

            })
            .catch((error) => {

                commit('getError', error.response.data.errors)

            });

    },
    tryAutoLogin({commit}) {
        const token = localStorage.getItem('token')
        if (!token) {
            return
        }
        const expirationDate = localStorage.getItem('expirationDate')
        const now = new Date()
        if (now >= expirationDate) {
            return
        }
        const userId = localStorage.getItem('userId')
        commit('authUser', {
            token: token,
            userId: userId
        })
    },
    logout({commit}) {
        console.log('hello')
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        axios.post(`auth/logout`)
            .then(res => {
                if (res) {
                    setTimeout(() => {
                        snackbar.state.snackbar.condition = true;
                        snackbar.state.snackbar.message = 'Logged Out Successfully';
                    }, 2)
                    commit('clearAuthData')
                    localStorage.removeItem('expirationDate')
                    localStorage.removeItem('token')
                    localStorage.removeItem('userId')
                    localStorage.removeItem('name')
                    localStorage.removeItem('userRole')
                    localStorage.removeItem('isStaff')
                    axios.defaults.headers.common['Authorization'] = null;
                    globalAxios.defaults.headers.common['Authorization'] = null;
                    router.push({name: 'authentication/LoginPage'})
                }
            })


    },
    storeUser(state, userData) {
        if (!state.idToken) {
            return
        }
        globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
            .then(res => console.log(res))
            .catch(error => console.log(error))
    },
    fetchUser({commit, state}) {
        if (!state.idToken) {
            return
        }
        globalAxios.get('/users.json' + '?auth=' + state.idToken)
            .then(res => {
                console.log(res)
                const data = res.data
                const users = []
                for (let key in data) {
                    const user = data[key]
                    user.id = key
                    users.push(user)
                }
                console.log(users)
                commit('storeUser', users[0])
            })
            .catch(error => console.log(error))
    },
};
export default {
    state,
    getters,
    mutations,
    actions,
};