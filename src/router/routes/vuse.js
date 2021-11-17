// Authentication Pages

export default [
  {
    params: {
      path: "/home",
      name: "Home",
    },
    defaultComponentPath: "Pages/Home",
    navs: true,
  },
  {
    params: {
      path: "/products",
      name: "Product",
    },
    defaultComponentPath: "Pages/Product/products",
    navs: true,
  },
  {
    params: {
      path: "/product/:id/:name",
      name: "productView",
    },
    defaultComponentPath: "Pages/Product/partials/productView",
    navs: true,
  },
  {
    params: {
      path: "/cart",
      name: "cartView",
      meta: {requiresAuth: true},
    },
    defaultComponentPath: "Pages/Cart/cart",
    navs: true,
  },

  {
    params: {
      path: "/checkout",
      name: "checkoutView",
      meta: {requiresAuth: true},
    },
    defaultComponentPath: "Pages/Checkout/checkout",
    navs: true,
  },
  {
    params: {
      path: "/my/order",
      name: "myOrders",
      meta: {requiresAuth: true},
    },
    defaultComponentPath: "Pages/Orders/orders",
    navs: true,
  },

  {
    params: {
      path: "/my/order/:id/:view",
      name: "myOrdersView",
      meta: {requiresAuth: true},
    },
    defaultComponentPath: "Pages/Orders/orderView",
    navs: true,
  },
  {
    params: {
      path: "/login",
      name: "authentication/LoginPage",
      meta: {guest: true},

    },
    defaultComponentPath: "Pages/Authentication/Login/login",
    navs: true,
  },
  {
    params: {
      path: "/signup",
      name: "authentication/Signup/Page",
      meta: {guest: true},
    },
    defaultComponentPath: "Pages/Authentication/Signup/signup",
    navs: true,
  },
  {
    params: {
      path: "/dashboard",
      name: "Dashboard",
      meta: {admin: true},
    },
    defaultComponentPath: "Pages/Dashboard/dashboard",
    navs: true,
  },
  {
    params: {
      path: "/dashboard/users",
      name: "dashboardUsers",
      meta: {admin: true},
    },
    defaultComponentPath: "Pages/Dashboard/Users/users",
    navs: true,
  },
  {
    params: {
      path: "/dashboard/products",
      name: "DashboardProducts",
      meta: {admin: true},
    },
    defaultComponentPath: "Pages/Dashboard/Products/products",
    navs: true,
  },
  {
    params: {
      path: "/dashboard/orders",
      name: "DashboardOrders",
      meta: {admin: true},
    },
    defaultComponentPath: "Pages/Dashboard/Orders/orders",
    navs: true,
  },
  {
    params: {
      path: "/user/history/order/:id",
      name: "ordersHistoryMy",
      meta: {requiresAuth: true},
    },
    defaultComponentPath: "Pages/Orders/orderHistory",
    navs: true,
  },
  {
    params: {
      path: "*",
      name: "PageNotFound",
      meta: {layout: "full"},
    },
    defaultComponentPath: "Pages/Errors/Error404",
  },

];
