import axios from "axios";
import snackbar from "@/store/Snackbar";


export const state =
    {
        users: '',
        coverPictureDialogClose: 0,
        coverUploadPercentage: '',
        profilePictureDialogClose: 0,
        coverPicture: '',
        userImage: {
            profileImage: '',
            coverImage: '',
        },
        coverPictureUploadError: '',
        userImageId: '',
        userImages: '',
        dialogCloseGeneralEdit: 0,
        dialogClosePersonalEdit: 0,
        dialogCloseContactEdit: 0,
        dialogCloseMedicalEdit: 0,
        dialogCloseContactPersonEdit: 0,
        dialogCloseContactPersonCreate: 0,
        editGeneral: '',
        editPersonal: '',
        editContact: '',
        editContactPerson: '',
        createContactPerson: '',
        editMedical: '',
        checkEditGeneral: {
            name: '',
            profileInformation: {
                nickname: '',
                birthdate: '',
                nationality: '',
                nationalId: '',
                gender: '',

                language: {
                    name: '',
                },


            },

            role: '',
            isStaff: '',
            isActive: '',

        },
        checkEditPersonal: {
            personalInformation: {},
        },
        checkEditContact: {
            email: '',
            phone: '',
            userAddress: {
                houseNo: '',
                postalCode: '',
                state: '',
                street: '',
                country: {
                    name: '',
                }
            },
        },
        checkEditContactPerson: {},

        checkEditMedical: {
            medicalInformation: {},
        },
        editIndex: -1,
        contactPersonEditErrors: {
            email: '',
            phone: '',
        },
        contactPersonCreateErrors: {
            email: '',
            phone: '',
        },

    }

export const getters = {
    showUser: (state) => {
        return state.users;
    },
    getCoverPictureDialogClose: (state) => {
        return state.coverPictureDialogClose;
    },
    getCoverProgressbar: (state) => {
        return state.coverUploadPercentage;
    },
    getProfilePictureDialogClose: (state) => {
        return state.profilePictureDialogClose;
    },
    getUserImage: (state) => {
        return state.userImage;
    },

    getDialogCloseGeneralEdit: (state) => {
        return state.dialogCloseGeneralEdit;
    },
    getDialogClosePersonalEdit: (state) => {
        return state.dialogClosePersonalEdit;
    },
    getDialogCloseContactEdit: (state) => {
        return state.dialogCloseContactEdit;
    },
    getDialogCloseContactPersonEdit: (state) => {
        return state.dialogCloseContactPersonEdit;
    },
    getDialogCloseContactPersonCreate: (state) => {
        return state.dialogCloseContactPersonCreate;
    },
    getDialogCloseMedicalEdit: (state) => {
        return state.dialogCloseMedicalEdit;
    },
    getContactPersonEditErrorMessage: (state) => {
        return state.contactPersonEditErrors;
    },
    getContactPersonCreateErrorMessage: (state) => {
        return state.contactPersonCreateErrors;
    },


}
export const mutations = {

    setContactPersonEditErrorMessage(state, errorMessage) {
        state.contactPersonEditErrors = errorMessage;

    },
    setContactPersonCreateErrorMessage(state, errorMessage) {
        state.contactPersonCreateErrors = errorMessage;

    },
    setUserImages(state) {
        Object.keys(state.userImages).forEach(function (key) {
            if (state.userImages[key].isProfileImage == 1) {
                state.userImage.profileImage = axios.defaults.baseURL + '/Uploads/User/Image/' + state.userImages[key].name;
            } else {
                state.userImage.coverImage = axios.defaults.baseURL + '/Uploads/User/Image/' + state.userImages[key].name;

            }

        })

    },
    updateGeneralInformationUser(state) {

        Object.assign(state.users, state.checkEditGeneral)
    },
    updatePersonalInformationUser(state) {

        Object.assign(state.users, state.checkEditPersonal)
    },
    updateContactInformationUser(state) {

        Object.assign(state.users, state.checkEditContact)
    },
    updateContactPersonInformationUser(state) {

        state.editIndex = state.users.contactPersonInformation.findIndex(x => x.id === state.checkEditContactPerson.id);
        if (state.editIndex > -1) {
            Object.assign(state.users.contactPersonInformation[state.editIndex], state.checkEditContactPerson)
        }
    },
    updateMedicalInformationUser(state) {

        Object.assign(state.users, state.checkEditMedical)
    },
}
export const actions = {
    getUser({state}, id) {

        axios.get(`/api/dashboard/admin/user/${id.id}`)
            .then(res =>
                state.users = res.data.data
            )

    },

    getUserImages({state, commit}, id) {
        state.userImageId = id
        axios.get(`/api/dashboard/admin/user/profile/upload/profileImage/${state.userImageId}`)
            .then(res => {
                    state.userImages = res.data;

                    commit('setUserImages');
                }
            )
    },
    userCoverPictureUpload({state}, file) {
        state.coverPictureDialogClose = 0;
        state.profilePictureDialogClose = 0;
        state.coverPicture = file;

        axios.post('/api/dashboard/admin/user/profile/upload/coverPicture/', state.coverPicture,
            {
                onUploadProgress: e => {
                    if (e.lengthComputable) {
                        state.coverUploadPercentage = (e.loaded / e.total) * 100
                    }
                }
            }
        )
            .then(res => {
                    if (res) {
                        if (state.coverPicture.check == 0) {
                            state.coverPictureDialogClose = 1;
                            state.userImage.coverImage = state.coverPicture.preview;


                        } else {
                            state.profilePictureDialogClose = 1;
                            state.userImage.profileImage = state.coverPicture.preview;
                        }

                    }
                }
            )
            .catch(error => state.coverPictureUploadError = error.response.data.errors)
    },
    editGeneralInformation({state, commit}, editedGeneral) {
        state.dialogCloseGeneralEdit = 0;
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        state.editGeneral = editedGeneral;
        state.checkEditGeneral.name = state.editGeneral.firstName + ' ' + editedGeneral.lastName;
        state.checkEditGeneral.role = state.editGeneral.role;
        state.checkEditGeneral.id = state.editGeneral.id;
        state.checkEditGeneral.isStaff = state.editGeneral.isStaff;
        state.checkEditGeneral.isActive = state.editGeneral.isActive;
        state.checkEditGeneral.profileInformation.nationality = state.editGeneral.nationality;
        state.checkEditGeneral.profileInformation.nickname = state.editGeneral.nickname;
        state.checkEditGeneral.profileInformation.birthdate = state.editGeneral.birthdate;
        state.checkEditGeneral.profileInformation.nationalId = state.editGeneral.nationalId;
        state.checkEditGeneral.profileInformation.gender = state.editGeneral.gender;
        state.checkEditGeneral.profileInformation.language.name = state.editGeneral.language.name;
        axios.put(`/api/dashboard/admin/user/general/update/${state.editGeneral.id}`, state.editGeneral)
            .then(res => {
                if (res) {
                    state.dialogCloseGeneralEdit = 1
                    snackbar.state.snackbar.condition = true
                    snackbar.state.snackbar.message = 'General Information Edited'
                    commit('updateGeneralInformationUser');
                }


            })
            .catch(error =>
                commit('setGeneralEditErrorMessage', error.response.data.errors)
            )

    },
    editPersonalInformation({state, commit}, editedPersonal) {
        state.dialogClosePersonalEdit = 0;
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        state.editPersonal = editedPersonal;
        state.checkEditPersonal.personalInformation.school = state.editPersonal.school;
        state.checkEditPersonal.personalInformation.classNo = state.editPersonal.classNo;
        state.checkEditPersonal.personalInformation.work = state.editPersonal.work;
        state.checkEditPersonal.personalInformation.profession = state.editPersonal.profession;
        state.checkEditPersonal.personalInformation.sportsHistory = state.editPersonal.sportsHistory;
        state.checkEditPersonal.personalInformation.licenceNumber = state.editPersonal.licenceNumber;
        state.checkEditPersonal.personalInformation.licenceExpirationDate = state.editPersonal.licenceExpirationDate;
        state.checkEditPersonal.personalInformation.playerNumber = state.editPersonal.playerNumber;

        axios.put(`/api/dashboard/admin/user/personal/update/${state.editPersonal.id}`, state.editPersonal)
            .then(res => {
                if (res) {
                    state.dialogClosePersonalEdit = 1
                    snackbar.state.snackbar.condition = true
                    snackbar.state.snackbar.message = 'Personal Information Edited'
                    commit('updatePersonalInformationUser');
                }


            })
            .catch(error =>
                commit('setPersonalEditErrorMessage', error.response.data.errors)
            )

    },
    editContactInformation({state, commit}, editedContact) {
        state.dialogCloseContactEdit = 0;
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        state.editContact = editedContact;
        state.checkEditContact.userAddress.houseNo = state.editContact.houseNo;
        state.checkEditContact.userAddress.postalCode = state.editContact.postalCode;
        state.checkEditContact.userAddress.state = state.editContact.state;
        state.checkEditContact.userAddress.city = state.editContact.city;
        state.checkEditContact.userAddress.street = state.editContact.street;
        state.checkEditContact.userAddress.country.name = state.editContact.country.name;
        state.checkEditContact.email = state.editContact.email;
        state.checkEditContact.phone = state.editContact.phone;

        axios.put(`/api/dashboard/admin/user/contact/update/${state.editContact.id}`, state.editContact)
            .then(res => {
                if (res) {
                    state.dialogCloseContactEdit = 1
                    snackbar.state.snackbar.condition = true
                    snackbar.state.snackbar.message = 'Contact Information Edited'
                    commit('updateContactInformationUser');
                }


            })
            .catch(error =>
                commit('setContactEditErrorMessage', error.response.data.errors)
            )

    },
    editContactPersonInformation({state, commit}, editedContactPerson) {
        state.dialogCloseContactPersonEdit = 0;
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        state.editContactPerson = editedContactPerson;
        state.checkEditContactPerson.id = state.editContactPerson.id;
        state.checkEditContactPerson.name = state.editContactPerson.name;
        state.checkEditContactPerson.nationalId = state.editContactPerson.nationalId;
        state.checkEditContactPerson.contactType = state.editContactPerson.contactType;
        state.checkEditContactPerson.houseNo = state.editContactPerson.houseNo;
        state.checkEditContactPerson.postalCode = state.editContactPerson.postalCode;
        state.checkEditContactPerson.city = state.editContactPerson.city;
        state.checkEditContactPerson.street = state.editContactPerson.street;
        state.checkEditContactPerson.country = state.editContactPerson.country;
        state.checkEditContactPerson.email = state.editContactPerson.email;
        state.checkEditContactPerson.phone = state.editContactPerson.phone;
        state.checkEditContactPerson.isReceiveInvoice = state.editContactPerson.isReceiveInvoice;
        state.checkEditContactPerson.isReceiveWeeklyPlans = state.editContactPerson.isReceiveWeeklyPlans;


        axios.put(`/api/dashboard/admin/user/contactPerson/update/${state.editContactPerson.id}`, state.editContactPerson)
            .then(res => {
                if (res) {
                    state.dialogCloseContactPersonEdit = 1
                    snackbar.state.snackbar.condition = true
                    snackbar.state.snackbar.message = 'Contact Person Information Edited'
                    commit('updateContactPersonInformationUser');
                }


            })
            .catch(error =>
                commit('setContactPersonEditErrorMessage', error.response.data.errors)
            )

    },
    createContactPersonInformation({state, commit, dispatch}, createdContactPerson) {
        state.dialogCloseContactPersonCreate = 0;
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        state.createContactPerson = createdContactPerson;
        axios.post(`/api/dashboard/admin/user/contactPerson/create/`, state.createContactPerson)
            .then(res => {
                if (res) {
                    state.dialogCloseContactPersonCreate = 1
                    snackbar.state.snackbar.condition = true
                    snackbar.state.snackbar.message = 'Contact Person Information Edited'
                    dispatch('getUser', {id: state.createContactPerson.userId})

                }


            })
            .catch(error =>
                commit('setContactPersonCreateErrorMessage', error.response.data.errors)
            )

    },

    editMedicalInformation({state, commit}, editedMedical) {
        state.dialogCloseMedicalEdit = 0;
        snackbar.state.snackbar.condition = false;
        snackbar.state.snackbar.message = '';
        state.editMedical = editedMedical;
        state.checkEditMedical.medicalInformation.iCheckUp = state.editMedical.iCheckUp;
        state.checkEditMedical.medicalInformation.nCheckUp = state.editMedical.nCheckUp;
        state.checkEditMedical.medicalInformation.allergies = state.editMedical.allergies;
        state.checkEditMedical.medicalInformation.comment = state.editMedical.comment;
        axios.put(`/api/dashboard/admin/user/medical/update/${state.editMedical.id}`, state.editMedical)
            .then(res => {
                if (res) {
                    state.dialogCloseMedicalEdit = 1
                    snackbar.state.snackbar.condition = true
                    snackbar.state.snackbar.message = 'Medical Information Edited'
                    commit('updateMedicalInformationUser');
                }


            })
            .catch(error =>
                commit('setMedicalEditErrorMessage', error.response.data.errors)
            )

    },


}

export default {
    state,
    getters,
    mutations,
    actions
};