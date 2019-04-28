import Vue from "vue";
import Vuex from "vuex";

import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

export const initialState = {
  data: {
    address_id: null,
    created_at: null,
    description: null,
    email: null,
    id: null,
    is_company: null,
    last_name: null,
    name: null,
    password: null,
    path_image: null,
    site: null,
    token: null,
    updated_at: null,
    address: {},
    total_vacancies: "0"
  },
  feedbackTitle: "",
  feedbackMessage: "",
  isLogged: false,
  loading: false
};

const store = {
  state: { ...initialState },
  mutations,
  actions
};

export default store;
