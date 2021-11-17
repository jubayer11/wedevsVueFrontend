import LazyLoad from "@/utils/AsyncRouteHelper";
import VuseRoutes from "./routes/vuse";
const AppSidebar = () =>
  import(
     "@/layouts/App/Sidebar"
  );
const AppToolbar = () =>
  import(
     "@/layouts/App/Toolbar"
  );
const AppFooter = () =>
  import(
     "@/layouts/App/Footer"
  );

const AllRoutes = [...VuseRoutes];
const routes = AllRoutes.map((route) => {
  const { params, defaultComponentPath, navs } = route;
  const componentObj = navs
    ? {
        components: {
          default: LazyLoad(defaultComponentPath),
          sidebar: AppSidebar,
          header: AppToolbar,
          footer: AppFooter,
        },
      }
    : {
        component: LazyLoad(defaultComponentPath),
      };
  return {
    ...params,
    ...componentObj,
  };
});

export default [{ path: "/", redirect: "/home" }, ...routes];
