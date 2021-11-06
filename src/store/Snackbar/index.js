export const state =
    {
        snackbar:
            {
                condition: false,
                message: '',
            }
    }

export const getters = {
    getSnackbar: (state) => {
        return state.snackbar;
    }
}
export default {
    state,
    getters,

};