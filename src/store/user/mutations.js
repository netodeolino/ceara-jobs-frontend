import * as types from "./types";
import { initialState } from "./index";

const mutations = {
  setToken(state, payload) {
    state.data.token = payload;
  },
  setPathImage(state, payload) {
    state.data.pathImage = payload;
  },
  setUserId(state, payload) {
    state.data.userId = payload;
  },
  [types.LOGIN](state) {
    state.data = { ...initialState.data };
    state.feedbackMessage = "";
    state.feedbackTitle = "";
    state.isLogged = false;
    state.loading = true;
  },
  [types.LOGIN_SUCCESS](state, payload) {
    state.data = { ...payload.user };
    state.feedbackTitle = payload.feedbackTitle;
    state.feedbackMessage = payload.feedbackMessage;
    state.loading = false;
    state.isLogged = true;
  },
  [types.LOGIN_FAIL](state, payload) {
    state.feedbackTitle = payload.feedbackTitle;
    state.feedbackMessage = payload.feedbackMessage;
    state.loading = false;
    state.isLogged = false;
  },
  [types.LOGOUT](state) {
    state.data = { ...initialState.data };
    state.isLogged = false;
  }
};

export default mutations;
