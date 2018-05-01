import Vue from "vue";
import Router from "vue-router";
import UUID from "vue-uuid";
import Main from "@/components/Main";

Vue.use(Router);
Vue.use(UUID);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Main",
      component: Main
    }
  ]
});
