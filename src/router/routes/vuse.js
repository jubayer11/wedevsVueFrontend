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
      path: "/product/:id",
      name: "productView",
    },
    defaultComponentPath: "Pages/Product/partials/productView",
    navs: true,
  },
  {
    params: {
      path: "/cart",
      name: "cartView",
    },
    defaultComponentPath: "Pages/Cart/cart",
    navs: true,
  },

  {
    params: {
      path: "/checkout",
      name: "checkoutView",
    },
    defaultComponentPath: "Pages/Checkout/checkout",
    navs: true,
  },
  {
    params: {
      path: "/my/order",
      name: "myOrders",
    },
    defaultComponentPath: "Pages/Orders/orders",
    navs: true,
  },
  {
    params: {
      path: "/my/order/:id",
      name: "myOrdersView",
    },
    defaultComponentPath: "Pages/Orders/orderView",
    navs: true,
  },
  {
    params: {
      path: "/login",
      name: "authentication/LoginPage",
    },
    defaultComponentPath: "Pages/Authentication/Login/login",
    navs: true,
  },
  {
    params: {
      path: "/signup",
      name: "authentication/Signup/Page",
    },
    defaultComponentPath: "Pages/Authentication/Signup/signup",
    navs: true,
  },
  {
    params: {
      path: "*",
      name: "PageNotFound",
      meta: { layout: "full" },
    },
    defaultComponentPath: "Pages/Errors/Error404",
  },

];
