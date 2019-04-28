import axios from "axios";
import { BASE_URL, LOGIN_URL } from "../../constants/api";
import * as types from "./types";

const actions = {
  async doLogin({ commit }, { email, password }) {
    commit(types.LOGIN);
    axios
      .post(`${BASE_URL}${LOGIN_URL}`, {
        email,
        password
      })
      .then(resp => {
        const { user, status, message } = resp.data;

        commit(types.LOGIN_SUCCESS, {
          user,
          feedbackTitle: status,
          feedbackMessage: message
        });
      })
      .catch(error => {
        const { status, message } = error.response.data;

        commit(types.LOGIN_FAIL, {
          feedbackTitle: status,
          feedbackMessage: message
        });
      });
  },
  doLogout({ commit }) {
    commit(types.LOGOUT);
  },
  setPathImage({ commit }, pathImage) {
    commit("setPathImage", pathImage);
  },
  setUserId({ commit }, userId) {
    commit("setUserId", userId);
  }
};

export default actions;
