import axios from "axios";
import router from "@/router";
import snackbar from "@/store/Snackbar";
import moment from "moment";

export const state =
    {
        users: [],
        checkUsers: [],
        user: 'check',
        shufflex: 'users',
        roles: [],
        newUser: '',
        errors: {
            email: '',
            phone: '',
        },
        editErrors: {
            email: '',
            phone: '',
        },

        dialogClose: 0,
        dialogCloseEdit: 0,
        deleteUser: '',
        editUser: '',
        checkEditUser: {
            id: '',
            name: '',
            email: '',
            phone: '',
            role: '',
            nationality: {
                nationality: 'jon cena',
            }


        },
        doubleCheckUsers: '',
        editIndex: -1,
        uploadPercentage: '',

        languages: '',
        countries: '',
        dialogRoleCreateClose: 0,
        newRole: '',
        roleErrorMessage: '',
        dialogRoleEditClose: 0,
        deleteRole: '',
        dialogRoleDeleteClose: 0,
        permissions: [],
        clonePermissions: [],
        roleId: '',
        userId: '',
        rolePermissions: '',
        userPermissions: [],
        selectedPermission: '',
        selectedRolePermissionArray: [],
        selectedPermissionArray: [],
        searchRolePermission: '',
        searchCloneRolePermission: '',
        searchPermission: '',
        searchClonePermission: [],
        dialogCloseAssignPermission: 0,
        newPermission: '',
        editPermission: '',
        dialogPermissionEditClose: 0,
        dialogPermissionCreateClose: 0,
        searchUserClonePermission: [],
        selectedUserPermissionArray: [],
        selectedUserUserPermissionArray: [],
        cloneUserPermissions: [],
        userUserPermissions: [],
        dialogCloseAssignUserPermission: 0,
        selectedUserPermission: '',
        searchUserPermission: '',
        searchUserUserPermission: '',
        searchCloneUserUserPermission: '',
        showPermissions: [],
        currencies: '',
        userClubList: [],
        playerActivities: [],
        clonePlayerActivity: [],
        today: '',
        clubId: '',
        dialogFeedbackEditClose: 0,
        activityFeedback: '',
        newClub: '',
        editClub: '',
        dialogClubCreateClose: 0,
        dialogClubManagerEditClose: 0,
        profileItem: '',
        notifications: '',
        countUnreadNotification: '',
        toDate: '',
        availabilityItem: ''
    }

export const getters = {
    getDialogClubCreateClose: (state) => {
        return state.dialogClubCreateClose;
    },
    getDialogClubEditClose: (state) => {
        return state.dialogClubManagerEditClose;
    },
    getDialogFeedbackEditClose: (state) => {
        return state.dialogFeedbackEditClose;
    },
    showUserClubList: (state) => {
        return state.userClubList;
    },
    showPlayerActivities: (state) => {
        return state.playerActivities;
    },
    errorMessage: (state) => {
        return state.errors;
    },
    getClubId: (state) => {
        return state.clubId;

    },
    showUsers: (state) => {

        return state.checkUsers;
    },
    showRoles: (state) => {
        return state.roles;
    },
    showPermissions: (state) => {

        return state.showPermissions;
    },
    getAllPermission: (state) => {
        return state.clonePermissions;
    },
    getAllUserPermission: (state) => {
        return state.cloneUserPermissions;
    },
    getRolePermissions: (state) => {
        return state.rolePermissions;
    },
    getUserUserPermissions: (state) => {
        return state.userUserPermissions;
    },
    getDialogClose: (state) => {
        return state.dialogClose;
    },
    getDialogCloseEdit: (state) => {
        return state.dialogCloseEdit;

    },
    getDialogRoleCreateClose: (state) => {
        return state.dialogRoleCreateClose;
    },
    getDialogRoleEditClose: (state) => {
        return state.dialogRoleEditClose;
    },
    getDialogPermissionCreateClose: (state) => {
        return state.dialogPermissionCreateClose;
    },
    getDialogPermissionEditClose: (state) => {
        return state.dialogPermissionEditClose;
    },
    getDialogCloseAssignPermission: (state) => {
        return state.dialogCloseAssignPermission;
    },
    getDialogCloseAssignUserPermission: (state) => {
        return state.dialogCloseAssignUserPermission;
    },
    showLanguages: (state) => {
        return state.languages;
    },
    getEditErrorMessage: (state) => {
        return state.editErrors;
    },
    getEditUser: (state) => {
        return state.editUser;
    },
    showCountries: (state) => {
        return state.countries;
    },
    getRoleErrorMessage: (state) => {
        return state.roleErrorMessage;
    },
    showCurrencies: (state) => {
        return state.currencies;
    },
    showNotification: (state) => {
        return state.notifications;
    },
    getCountUnreadNotification: (state) => {
        return state.countUnreadNotification;
    }


}
export const mutations = {

    setEditErrorMessage(state, errorMessage) {
        state.editErrors = errorMessage;

    },
    updateUser(state) {
        state.editIndex = state.checkUsers.findIndex(x => x.id === state.checkEditUser.id);
        if (state.editIndex > -1) {
            Object.assign(state.checkUsers[state.editIndex], state.checkEditUser)
        }

    },
    setRoles(state) {

        state.editIndex = state.roles.findIndex(x => x.id === state.editRole.id);
        if (state.editIndex > -1) {
            Object.assign(state.roles[state.editIndex], state.editRole)
        }
    },
    setPermission(state) {

        state.editIndex = state.showPermissions.findIndex(x => x.id === state.editPermission.id);

        if (state.editIndex > -1) {
            Object.assign(state.showPermissions[state.editIndex], state.editPermission)
        }
    },

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
    organizingPermission(state) {
        state.searchClonePermission = [];
        state.selectedPermissionArray = [];
        state.selectedRolePermissionArray = [];
        state.clonePermissions = [];
        state.searchCloneRolePermission = state.rolePermissions;

        Object.keys(state.permissions).forEach(function (key1) {
            if (state.permissions[key1]) {
                state.permissions[key1].customClass = '';
                if (state.permissions[key1].isActive == 0) {
                    state.permissions[key1].checkActive = 'Not Active';
                } else if (state.permissions[key1].isActive == 1) {
                    state.permissions[key1].checkActive = 'Active';
                }
                state.clonePermissions.push(state.permissions[key1]);
            }

        })
        Object.keys(state.rolePermissions).forEach(function (key) {
            if (state.rolePermissions[key].isActive == 0) {
                state.rolePermissions[key].checkActive = 'Not Active';
            } else if (state.rolePermissions[key].isActive == 1) {
                state.rolePermissions[key].checkActive = 'Active';

            }

            if (state.clonePermissions != '') {
                state.editIndex = state.clonePermissions.findIndex(x => x.id === state.rolePermissions[key].id);
                if (state.editIndex > -1) {
                    state.clonePermissions.splice(state.editIndex, 1);
                }
            }


        })

        state.searchClonePermission = state.clonePermissions;
    },
    organizingUserPermission(state) {
        state.searchUserClonePermission = [];
        state.selectedUserPermissionArray = [];
        state.selectedUserUserPermissionArray = [];
        state.cloneUserPermissions = [];
        state.searchCloneUserUserPermission = state.userUserPermissions;

        Object.keys(state.userPermissions).forEach(function (key1) {
            if (state.userPermissions[key1]) {
                state.userPermissions[key1].customClass = '';
                if (state.userPermissions[key1].isActive == 0) {
                    state.userPermissions[key1].checkActive = 'Not Active';
                } else if (state.userPermissions[key1].isActive == 1) {
                    state.userPermissions[key1].checkActive = 'Active';
                }
                state.cloneUserPermissions.push(state.userPermissions[key1]);
            }

        })
        Object.keys(state.userUserPermissions).forEach(function (key) {
            if (state.userUserPermissions[key].isActive == 0) {
                state.userUserPermissions[key].checkActive = 'Not Active';
            } else if (state.userUserPermissions[key].isActive == 1) {
                state.userUserPermissions[key].checkActive = 'Active';

            }

            if (state.cloneUserPermissions != '') {
                state.editIndex = state.cloneUserPermissions.findIndex(x => x.id === state.userUserPermissions[key].id);
                if (state.editIndex > -1) {
                    state.cloneUserPermissions.splice(state.editIndex, 1);
                }
            }


        })

        state.searchUserClonePermission = state.cloneUserPermissions;
    },

    selectPermission(state, item) {
        state.selectedPermission = item;
        if (state.selectedPermission.check == 2) {

            if (state.rolePermissions[state.selectedPermission.index].customClass == '') {
                state.rolePermissions[state.selectedPermission.index].customClass = 'permission__selected';
                state.selectedRolePermissionArray.push(state.rolePermissions[state.selectedPermission.index])

            } else if (state.rolePermissions[state.selectedPermission.index].customClass == 'permission__moved') {
                state.rolePermissions[state.selectedPermission.index].customClass = '';

            } else {
                state.rolePermissions[state.selectedPermission.index].customClass = '';
                state.selectedRolePermissionArray.splice(state.selectedRolePermissionArray.indexOf(state.rolePermissions[state.selectedPermission.index]), 1);
            }
        } else {

            if (state.clonePermissions[state.selectedPermission.index].customClass == '') {
                state.clonePermissions[state.selectedPermission.index].customClass = 'permission__selected';
                state.selectedPermissionArray.push(state.clonePermissions[state.selectedPermission.index])
            } else if (state.clonePermissions[state.selectedPermission.index].customClass == 'permission__moved') {
                state.clonePermissions[state.selectedPermission.index].customClass = '';
            } else {
                state.clonePermissions[state.selectedPermission.index].customClass = '';
                state.selectedPermissionArray.splice(state.selectedPermissionArray.indexOf(state.clonePermissions[state.selectedPermission.index]), 1);
            }
        }
    },
    selectUserPermission(state, item) {
        state.selectedUserPermission = item;
        if (state.selectedUserPermission.check == 2) {

            if (state.userUserPermissions[state.selectedUserPermission.index].customClass == '') {
                state.userUserPermissions[state.selectedUserPermission.index].customClass = 'permission__selected';
                state.selectedUserUserPermissionArray.push(state.userUserPermissions[state.selectedUserPermission.index])

            } else if (state.userUserPermissions[state.selectedUserPermission.index].customClass == 'permission__moved') {
                state.userUserPermissions[state.selectedUserPermission.index].customClass = '';

            } else {
                state.userUserPermissions[state.selectedUserPermission.index].customClass = '';
                state.selectedUserUserPermissionArray.splice(state.selectedUserUserPermissionArray.indexOf(state.userUserPermissions[state.selectedUserPermission.index]), 1);
            }
        } else {

            if (state.cloneUserPermissions[state.selectedUserPermission.index].customClass == '') {
                state.cloneUserPermissions[state.selectedUserPermission.index].customClass = 'permission__selected';
                state.selectedUserPermissionArray.push(state.cloneUserPermissions[state.selectedUserPermission.index])
            } else if (state.cloneUserPermissions[state.selectedUserPermission.index].customClass == 'permission__moved') {
                state.cloneUserPermissions[state.selectedUserPermission.index].customClass = '';
            } else {
                state.cloneUserPermissions[state.selectedUserPermission.index].customClass = '';
                state.selectedUserPermissionArray.splice(state.selectedUserPermissionArray.indexOf(state.cloneUserPermissions[state.selectedUserPermission.index]), 1);
            }
        }
    },


    unselectPermission(state) {
        Object.keys(state.rolePermissions).forEach(function (key) {
            state.rolePermissions[key].customClass = '';
        })
        Object.keys(state.clonePermissions).forEach(function (key) {
            state.clonePermissions[key].customClass = '';

        })
        state.selectedPermissionArray = [];
        state.selectedRolePermissionArray = [];


    },
    unselectUserPermission(state) {
        Object.keys(state.userUserPermissions).forEach(function (key) {
            state.userUserPermissions[key].customClass = '';
        })
        Object.keys(state.cloneUserPermissions).forEach(function (key) {
            state.cloneUserPermissions[key].customClass = '';

        })
        state.selectedUserPermissionArray = [];
        state.selectedUserUserPermissionArray = [];


    },

    movingPermission(state) {

        Object.keys(state.selectedPermissionArray).forEach(function (key) {
            state.selectedPermissionArray[key].customClass = 'permission__moved'
            state.editIndex = state.clonePermissions.findIndex(x => x.id === state.selectedPermissionArray[key].id);
            if (state.editIndex > -1) {
                state.clonePermissions.splice(state.editIndex, 1);
            }
            state.rolePermissions.unshift(state.selectedPermissionArray[key]);
        })
        Object.keys(state.selectedRolePermissionArray).forEach(function (key) {
            state.selectedRolePermissionArray[key].customClass = 'permission__moved'
            state.editIndex = state.rolePermissions.findIndex(x => x.id === state.selectedRolePermissionArray[key].id);
            if (state.editIndex > -1) {
                state.rolePermissions.splice(state.editIndex, 1);
            }
            state.clonePermissions.unshift(state.selectedRolePermissionArray[key]);
        })
        state.selectedPermissionArray = [];
        state.selectedRolePermissionArray = [];
    },
    movingUserPermission(state) {

        Object.keys(state.selectedUserPermissionArray).forEach(function (key) {
            state.selectedUserPermissionArray[key].customClass = 'permission__moved'
            state.editIndex = state.cloneUserPermissions.findIndex(x => x.id === state.selectedUserPermissionArray[key].id);
            if (state.editIndex > -1) {
                state.cloneUserPermissions.splice(state.editIndex, 1);
            }
            state.userUserPermissions.unshift(state.selectedUserPermissionArray[key]);
        })
        Object.keys(state.selectedUserUserPermissionArray).forEach(function (key) {
            state.selectedUserUserPermissionArray[key].customClass = 'permission__moved'
            state.editIndex = state.userUserPermissions.findIndex(x => x.id === state.selectedUserUserPermissionArray[key].id);
            if (state.editIndex > -1) {
                state.userUserPermissions.splice(state.editIndex, 1);
            }
            state.cloneUserPermissions.unshift(state.selectedUserUserPermissionArray[key]);
        })
        state.selectedUserPermissionArray = [];
        state.selectedUserUserPermissionArray = [];
    },

    searchRolePermission(state, value) {
        state.searchRolePermission = value;
        state.searchRolePermission = state.searchRolePermission.toUpperCase();

        state.rolePermissions = state.searchCloneRolePermission.filter((el) => {
            return (el.name.toUpperCase().match(state.searchRolePermission)) || (el.label.toUpperCase().match(state.searchRolePermission)) || (el.checkActive.toUpperCase().match(state.searchRolePermission))

        });
    },
    searchUserUserPermission(state, value) {
        state.searchUserUserPermission = value;
        state.searchUserUserPermission = state.searchUserUserPermission.toUpperCase();

        state.userUserPermissions = state.searchCloneUserUserPermission.filter((el) => {
            return (el.name.toUpperCase().match(state.searchUserUserPermission)) || (el.label.toUpperCase().match(state.searchUserUserPermission)) || (el.checkActive.toUpperCase().match(state.searchUserUserPermission))

        });
    },


    searchPermission(state, value) {
        state.searchPermission = value;
        state.searchPermission = state.searchPermission.toUpperCase();

        state.clonePermissions = state.searchClonePermission.filter((el) => {
            return (el.name.toUpperCase().match(state.searchPermission)) || (el.label.toUpperCase().match(state.searchPermission)) || (el.checkActive.toUpperCase().match(state.searchPermission))

        });
    },
    searchUserPermission(state, value) {
        state.searchUserPermission = value;
        state.searchUserPermission = state.searchUserPermission.toUpperCase();

        state.cloneUserPermissions = state.searchUserClonePermission.filter((el) => {
            return (el.name.toUpperCase().match(state.searchUserPermission)) || (el.label.toUpperCase().match(state.searchUserPermission)) || (el.checkActive.toUpperCase().match(state.searchUserPermission))

        });
    },
    organizePlayerActivity(state) {
        state.toDate = new Date().toISOString();
        state.toDate = moment(state.toDate).format('YYYY-MM-DD');
        Object.keys(state.playerActivities).forEach(function (key) {
            state.playerActivities[key].check = moment(state.playerActivities[key].start, 'YYYY-MM-DD HH:mm A')
            state.playerActivities[key].end = moment(state.playerActivities[key].end, 'YYYY-MM-DD HH:mm A')
            state.playerActivities[key].monthNumber = state.playerActivities[key].check.format('YYYY-MM')
            state.playerActivities[key].startTime = state.playerActivities[key].check.format('HH:mm A')
            state.playerActivities[key].startDate = state.playerActivities[key].check.format('YYYY-MM-DD')
            state.playerActivities[key].endTime = state.playerActivities[key].end.format('HH:mm A')
            state.playerActivities[key].endDate = state.playerActivities[key].end.format('YYYY-MM-DD')
            if (moment(state.playerActivities[key].startDate).isAfter(state.toDate)) {
                state.playerActivities[key].availabilityShow = 1;
            }

        })

        state.clonePlayerActivity = state.playerActivities;
        state.today = new Date().toISOString().substr(0, 7)


        state.playerActivities = state.playerActivities.filter((el) => {

            return ((el.clubId == state.clubId) && (el.monthNumber == state.today))
        });
    },
    updateClubId(state, id) {
        state.clubId = id
    },
    fetchPlayerActivity(state, select) {
        state.playerActivities = state.clonePlayerActivity;
        state.playerActivities = state.playerActivities.filter((el) => {

            return ((el.monthNumber == select.activityMonth) && (el.clubId == select.clubId))

        });


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
    checkProfileUpdate({state, dispatch}, id) {
        state.userId = id.id;
        axios.get(`/api/dashboard/admin/user/${state.userId}/checkProfileUpdate`)
            .then(res => {
                    if (res.data == 1) {
                        dispatch('sendProfileUpdateNotification')
                    }
                }
            )
    },
    sendProfileUpdateNotification({state, dispatch}) {
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        axios.post(`/api/dashboard/admin/user/${state.userId}/sendProfileUpdateNotification`)
            .then(res => {
                    if (res) {
                        snackbar.state.snackbar.condition = true;
                        snackbar.state.snackbar.message = 'Please Update Your Profile';
                        dispatch('getNotifications', state.userId);
                    }

                }
            )
    },
    getNotifications({state}, userId) {
        state.userId = userId;
        axios.get(`/api/dashboard/admin/user/${state.userId}/notification`)
            .then(res => {
                    state.notifications = res.data;
                    state.countUnreadNotification = res.data.unread.length;
                }
            )
    },
    markReadNotifications({state, dispatch}, userId) {
        state.userId = userId;
        axios.get(`/api/dashboard/admin/user/${state.userId}/notification/markRead`)
            .then(res => {
                    if (res) {
                        dispatch('getNotifications', state.userId);
                    }
                }
            )
    },
    getRoles({state}) {
        axios.get('/api/dashboard/admin/roles')
            .then(res => {
                    state.roles = res.data.data
                }
            )
    },
    getLanguage({state}) {
        axios.get('/api/dashboard/admin/languages')
            .then(res => {
                    state.languages = res.data.data
                }
            )
    },
    getCurrency({state}) {
        axios.get('/api/dashboard/admin/currencies')
            .then(res => {
                    state.currencies = res.data
                }
            )
    },
    userProfile({state}, user) {
        state.user = user.user;
        router.push({
            name: 'userProfileView',
            params: {name: state.user.name, id: state.user.id, role: state.user.role}
        })
    },
    createUsers({state, dispatch}, newUser) {
        state.dialogClose = 0;
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        state.newUser = newUser;
        axios.post('/api/dashboard/admin/user/create', state.newUser)
            .then(res => {
                if (res) {
                    state.dialogClose = 1
                    snackbar.state.snackbar.condition = true
                    snackbar.state.snackbar.message = 'New User Created'
                    dispatch('getUsers');
                }


            })
            .catch(error => state.errors = error.response.data.errors)


    },
    createRole({state, dispatch}, newRole) {
        state.dialogRoleCreateClose = 0;
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        state.newRole = newRole;
        axios.post('/api/dashboard/admin/role/create', state.newRole)
            .then(res => {
                if (res) {
                    state.dialogRoleCreateClose = 1
                    snackbar.state.snackbar.condition = true
                    snackbar.state.snackbar.message = 'New Role Created'
                    dispatch('getRoles');
                }


            })
            .catch(error => state.roleErrorMessage = error.response.data.errors)


    },
    createPermission({state, dispatch}, newPermission) {
        state.dialogPermissionCreateClose = 0;
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        state.newPermission = newPermission;
        axios.post('/api/dashboard/admin/permission/create', state.newPermission)
            .then(res => {
                if (res) {
                    state.dialogPermissionCreateClose = 1
                    snackbar.state.snackbar.condition = true
                    snackbar.state.snackbar.message = 'New Permission Created'
                    dispatch('getAllPermission');
                }


            })
            .catch(error => state.permissionErrorMessage = error.response.data.errors)


    },

    editRole({state, commit}, newRole) {
        state.dialogRoleEditClose = 0;
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        state.editRole = newRole;
        axios.post('/api/dashboard/admin/role/edit', state.editRole)
            .then(res => {
                if (res) {
                    state.dialogRoleEditClose = 1
                    snackbar.state.snackbar.condition = true
                    snackbar.state.snackbar.message = 'Role Edited'
                    commit('setRoles');
                }


            })
            .catch(error => state.roleErrorMessage = error.response.data.errors)


    },
    editPermission({state, commit}, newPermission) {
        state.dialogPermissionEditClose = 0;
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        state.editPermission = newPermission;
        axios.post('/api/dashboard/admin/permission/edit', state.editPermission)
            .then(res => {
                if (res) {
                    state.dialogPermissionEditClose = 1
                    snackbar.state.snackbar.condition = true
                    snackbar.state.snackbar.message = 'Permission Edited'
                    commit('setPermission');
                }


            })
            .catch(error => state.roleErrorMessage = error.response.data.errors)


    },

    deleteRoles({state}, deleteRole) {
        state.dialogRoleDeleteClose = 0;
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        state.deleteRole = deleteRole;
        axios.post('/api/dashboard/admin/role/delete', state.deleteRole)
            .then(res => {
                if (res) {
                    state.dialogRoleDeleteClose = 1
                    snackbar.state.snackbar.condition = true
                    snackbar.state.snackbar.message = 'Role Edited'

                }


            })
            .catch(error => state.roleErrorMessage = error.response.data.errors)
    },
    pullAllPermission({state}) {
        axios.get('/api/dashboard/admin/permissions')
            .then(res => {
                    state.permissions = res.data.data;
                    state.userPermissions = res.data.data;
                }
            )
    },
    getAllPermission({state}) {
        axios.get('/api/dashboard/admin/permissions/all')
            .then(res => {
                    state.showPermissions = res.data.data;
                }
            )
    },
    pullRolePermissions({state, commit}, id) {
        state.roleId = id;
        axios.get(`/api/dashboard/admin/role/${state.roleId}/permissions`)
            .then(res => {
                    state.rolePermissions = res.data.data
                    commit('organizingPermission')

                }
            )
    },
    pullUserPermissions({state, commit}, id) {
        state.userId = id;
        axios.get(`/api/dashboard/admin/user/${state.userId}/permissions`)
            .then(res => {
                    state.userUserPermissions = res.data.data
                    commit('organizingUserPermission')

                }
            )
    },
    assignPermissionToRole({state, commit}) {
        state.dialogCloseAssignPermission = 0
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        axios.post(`/api/dashboard/admin/role/${state.roleId}/assignPermissions`, {rolePermission: state.rolePermissions})
            .then(res => {
                if (res) {
                    state.dialogCloseAssignPermission = 1
                    snackbar.state.snackbar.condition = true
                    snackbar.state.snackbar.message = 'Permission Assigned'
                }


            })
            .catch(error =>
                commit('setAssignPermissionRoleErrorMessage', error.response.data.errors)
            )
    },
    assignPermissionToUser({state, commit}) {
        state.dialogCloseAssignUserPermission = 0;
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        axios.post(`/api/dashboard/admin/user/${state.userId}/assignPermissions`, {userPermission: state.userUserPermissions})
            .then(res => {
                if (res) {
                    state.dialogCloseAssignUserPermission = 1
                    snackbar.state.snackbar.condition = true
                    snackbar.state.snackbar.message = 'Permission Assigned'
                }


            })
            .catch(error =>
                commit('setAssignPermissionRoleErrorMessage', error.response.data.errors)
            )
    },

    editUsers({state, commit}, editedUser) {
        state.dialogCloseEdit = 0
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        state.editUser = editedUser;
        state.checkEditUser.name = state.editUser.firstName + ' ' + state.editUser.firstName;
        state.checkEditUser.role = state.editUser.role;
        state.checkEditUser.id = state.editUser.id;
        state.checkEditUser.phone = state.editUser.phone;
        state.checkEditUser.email = state.editUser.email;
        state.checkEditUser.nationality.nationality = state.editUser.nationality;
        state.checkEditUser.isStaff = state.editUser.isStaff;


        axios.put(`/api/dashboard/admin/user/update/${state.editUser.id}`, state.editUser)
            .then(res => {
                if (res) {
                    state.dialogCloseEdit = 1
                    snackbar.state.snackbar.condition = true
                    snackbar.state.snackbar.message = 'User Edited'
                    commit('updateUser');
                }


            })
            .catch(error =>
                commit('setEditErrorMessage', error.response.data.errors)
            )

    },
    deleteUsers({state}, user) {
        state.deleteUser = user;
        axios.delete(`/api/dashboard/admin/user/delete/${state.deleteUser.id}`)
            .then(res => {
                if (res) {
                    state.checkUsers.splice(state.checkUsers.indexOf(state.deleteUser), 1);
                }


            })
            .catch(error => state.errors = error.response.data.errors)
    },
    getAllCountries({state}) {
        axios.get('/api/dashboard/admin/countries/')
            .then(res => {
                    state.countries = res.data.data
                }
            )
    },

    getUserClubList({state}, id) {
        axios.get(`/api/dashboard/admin/user/${id}/getClubList`)
            .then(res => {
                    state.userClubList = res.data.data;
                    state.clubId = state.userClubList[0].id;
                }
            )
    },
    getPlayerActivities({state, commit}, id) {
        axios.get(`/api/dashboard/admin/user/${id}/getPlayerActivities`)
            .then(res => {
                    state.playerActivities = res.data.data
                    commit('organizePlayerActivity')
                }
            )
    },
    editFeedback({state, commit}, data) {
        state.activityFeedback = data;
        state.dialogFeedbackEditClose = 0;
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        axios.post(`/api/dashboard/admin/user/activity/feedback`, state.activityFeedback)
            .then(res => {
                if (res) {
                    state.dialogFeedbackEditClose = 1
                    snackbar.state.snackbar.condition = true
                    snackbar.state.snackbar.message = 'Plan Feedback Edited'
                    state.editIndex = state.playerActivities.findIndex(x => x.id === state.activityFeedback.id);

                    if (state.editIndex > -1) {
                        Object.assign(state.playerActivities[state.editIndex], state.activityFeedback)
                    }
                }


            })
            .catch(error =>
                commit('setAssignPermissionRoleErrorMessage', error.response.data.errors)
            )
    },
    managerCreateClub({state, dispatch}, item) {
        state.newClub = item;
        state.dialogClubCreateClose = 0;
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        axios.post('/api/dashboard/admin/club/manager/create', state.newClub)
            .then(res => {
                    if (res) {
                        dispatch('getUserClubList', state.newClub.userId);
                        state.dialogClubCreateClose = 1;
                        snackbar.state.snackbar.condition = true;
                        snackbar.state.snackbar.message = 'new club created';
                    }
                }
            )
    },
    managerEditClub({state}, item) {
        state.editClub = item;

        state.dialogClubManagerEditClose = 0;
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        axios.post('/api/dashboard/admin/club/edit', state.editClub)
            .then(res => {
                    if (res) {
                        state.dialogClubManagerEditClose = 1;
                        snackbar.state.snackbar.condition = true;
                        snackbar.state.snackbar.message = 'club Edited';
                        state.editIndex = state.userClubList.findIndex(x => x.id === state.editClub.id);
                        if (state.editIndex > -1) {
                            Object.assign(state.userClubList[state.editIndex], state.editClub)
                        }
                    }
                }
            )
    },
    userProfileView({state}, item) {
        state.profileItem = item;

        router.push({
            name: 'userProfileView',
            params: {name: state.profileItem.name, id: state.profileItem.userId, role: state.profileItem.userRole}
        })

    },
    changePlayerAvailability({state}, item) {
        state.availabilityItem = item;
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        axios.post('/api/dashboard/admin/player/availability/change', state.availabilityItem)
            .then(res => {
                    if (res) {
                        snackbar.state.snackbar.condition = true;
                        snackbar.state.snackbar.message = 'availability Changed';
                        state.editIndex = state.playerActivities.findIndex(x => x.id === state.availabilityItem.id);
                        if (state.editIndex > -1) {
                            Object.assign(state.playerActivities[state.editIndex], state.availabilityItem)
                            console.log(state.playerActivities[state.editIndex]);
                        }
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