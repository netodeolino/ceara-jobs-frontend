import Vue from "vue";
import Router from "vue-router";

import Profile from "./views/Profile.vue";

import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Login from "./views/auth/Login.vue";
import Register from "./views/auth/Register.vue";
import Vacancies from "./views/Vacancies.vue";
import Vacancy from "./views/Vacancy.vue";
import RegisterVacancy from "./views/RegisterVacancy.vue";
import Terms from "./views/Terms.vue";
import store from "./store";

Vue.use(Router);

const authValidation = next => {
  const token = store.state.user.data.token;
  if (token != null) {
    next();
  } else {
    next("/login");
  }
};

export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "vacancies",
      components: {
        header: AppHeader,
        default: Vacancies,
        footer: AppFooter
      }
    },
    {
      path: "/vacancy/:id",
      name: "vacancy",
      components: {
        header: AppHeader,
        default: Vacancy,
        footer: AppFooter
      }
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeader,
        default: Login,
        footer: AppFooter
      }
    },
    {
      path: "/register",
      name: "register",
      components: {
        header: AppHeader,
        default: Register,
        footer: AppFooter
      }
    },
    {
      path: "/register-vacancy",
      name: "register-vacancy",
      components: {
        header: AppHeader,
        default: RegisterVacancy,
        footer: AppFooter
      },
      beforeEnter: (to, from, next) => authValidation(next)
    },
    {
      path: "/profile/:id",
      name: "profile",
      components: {
        header: AppHeader,
        default: Profile,
        footer: AppFooter
      },
      beforeEnter: (to, from, next) => authValidation(next)
    },
    {
      path: "/terms",
      name: "terms",
      components: {
        header: AppHeader,
        default: Terms,
        footer: AppFooter
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
