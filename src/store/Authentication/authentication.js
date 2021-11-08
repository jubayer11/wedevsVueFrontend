import config from "@/config/index";
import axios from './axios-auth'
import globalAxios from 'axios'
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
    resetEmailErrorMessage: (state) => {
        return state.resetEmailError;
    },
    getPasswordConfirmationError: (state) => {
        return state.getPasswordConfirmationError;
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


};
export const mutations = {
    checkingIsBase64(state) {
        state.isBase64 = true;
    },

    getError(state, loginErrors) {
        state.errors = loginErrors;
    },
    getResetEmailError(state, resetEmailError) {
        state.resetEmailError = resetEmailError;
    },
    getPasswordConfirmationError(state, resetEmailError) {
        state.getPasswordConfirmationError = resetEmailError;
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
            // if (payload.iss == "https://mysportshive.com/sportsHive/api/dashboard/auth/login") {
            //     state.condition = true;
            // }
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
                state.isSignup = res.data.isSignup;
                state.userId = res.data.userUniqueId;
                dispatch('isValid', access_token)
                if (state.isSignup == 1 && state.condition == true) {
                    sidebar.show = false;
                    console.log('hello mello', state.condition, state.isSignup,state.userId);
                    router.push({
                        name: 'loginChangePassword',
                        params:{id:state.userId}
                    })
                } else if (state.condition == true) {
                    localStorage.setItem('token', res.data.access_token)
                    localStorage.setItem('token_type', res.data.token_type)
                    localStorage.setItem('userId', res.data.userUniqueId)
                    localStorage.setItem('expirationDate', res.data.expires_in)
                    localStorage.setItem('userRole', res.data.userRole)
                    localStorage.setItem('isStaff', res.data.isStaff)
                    localStorage.setItem('name', res.data.name)
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
    }
    ,
    logout({commit}) {
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
        router.push({name: 'pages/authentication/LoginPage'})

    },
    storeUser(state, userData) {
        if (!state.idToken) {
            return
        }
        globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
            .then(res => console.log(res))
            .catch(error => console.log(error))
    }
    ,
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
    }
    ,
    sendResetPasswordEmail({state, commit}, email) {


        state.snackbar = true;
        state.resetEmailError = '';
        axios.post('/dashboard/auth/reset-password', {

            email: email,

        })
            .then(res => {
                setTimeout(() => {
                    snackbar.state.snackbar.condition = true;
                    snackbar.state.snackbar.message = 'We have sent You a email to reset your password';
                }, 2)
                console.log(res)
            })
            .catch((error) => {

                commit('getResetEmailError', error.response.data.errors)

            });
    },
    gettingToken({commit}, resetData) {

        axios.post("/dashboard/auth/reset/password", {
            token: resetData.token,
            email: resetData.email,
            password: resetData.password,
            password_confirmation: resetData.password_confirmation
        })
            .then(res => {
                setTimeout(() => {
                    snackbar.state.snackbar.condition = true;
                    snackbar.state.snackbar.message = 'Password Reset Successfully. You Can Login Now';
                }, 2)
                console.log(res)
                console.log('hello')
            })
            .catch((error) => {

                commit('getPasswordConfirmationError', error.response.data.errors)

            });
    }
};
export default {
    state,
    getters,
    mutations,
    actions,
};