import router from "@/router";
import store from "@/store";

const middleware=router.beforeEach((to, from, next) => {

    if (to.matched.some(record => record.meta.requiresAuth)) {


        if (!store.getters['authentication/isAuthenticated']) {
            next({
                name: 'authentication/LoginPage',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    }
    else if (to.matched.some(record => record.meta.admin)) {

        if (!store.getters['authentication/isAdmin']) {
            next({
                name: 'Home',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    }
    else if (to.matched.some(record => record.meta.guest)) {

        if (store.getters['authentication/isAuthenticated']) {
            next({
                name: 'Home',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    }

    else {
        next() // make sure to always call next()!
    }
})
export default middleware;