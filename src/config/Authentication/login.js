export default {
    idToken: localStorage.getItem('token') || null,
    userId: null,
    user: null,
    errors: '',
    resetEmailError: '',
    condition: false,
    payload: null,
    isBase64: false,
    decoding: null,
    getPasswordConfirmationError: '',
    role: '',
    name: '',
    isStaff: '',
    isSignup: null,

};
