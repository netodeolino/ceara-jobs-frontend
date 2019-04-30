import * as types from "./types";
import { initialState } from "./index";

const mutations = {
  [types.GET_INITIAL_VACANCIES](state) {
    state.feedbackTitle = initialState.feedbackTitle;
    state.feedbackMessage = initialState.feedbackMessage;
    state.totalPages = initialState.totalPages;
    state.loading = true;
  },
  [types.GET_INITIAL_VACANCIES_SUCCESS](state, payload) {
    state.vacancies = payload.vacancies;
    state.feedbackTitle = "Success Title";
    state.feedbackMessage = "Sucess Message";
    state.totalPages = payload.totalPages;
    state.totalVacancies = payload.totalVacancies;
    state.loading = false;
  },
  [types.GET_INITIAL_VACANCIES_FAIL](state) {
    state.feedbackTitle = "Erro ao buscar as vagas";
    state.feedbackMessage =
      "Desculpe, ocorreu algum erro enquanto buscavamos as vagas, tente novamente.";
    state.loading = false;
  },
  [types.GET_VACANCIES_PAGE](state) {
    state.loading = true;
    state.feedbackTitle = initialState.feedbackTitle;
    state.feedbackMessage = initialState.feedbackMessage;
  },
  [types.GET_VACANCIES_PAGE_SUCCESS](state, payload) {
    state.vacancies = [...state.vacancies, ...payload.data];
    state.loading = false;
  },
  [types.GET_VACANCIES_PAGE_FAIL](state) {
    state.loading = false;
  }
};

export default mutations;
