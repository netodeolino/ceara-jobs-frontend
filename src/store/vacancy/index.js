import Vue from "vue";
import Vuex from "vuex";

import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

export const initialState = {
  vacancies: [],
  feedbackTitle: "",
  feedbackMessage: "",
  totalPages: 0,
  totalVacancies: 0,
  loading: false
};

const store = {
  state: { ...initialState },
  mutations,
  actions
};

export default store;
