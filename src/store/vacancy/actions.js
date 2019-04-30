import axios from "axios";
import { BASE_URL, GET_VACANCY_LIST } from "../../constants/api";
import * as types from "./types";

const actions = {
  async getInitialVacancies({ commit }) {
    commit(types.GET_INITIAL_VACANCIES);
    try {
      const totalVacancies = await axios.get(`${BASE_URL}listlength`);
      const totalPages = Math.ceil(totalVacancies.data / 5);

      let vacancies = [];
      for (let i = 0; i < totalPages || i < 4; i++) {
        await axios
          .get(`${BASE_URL}${GET_VACANCY_LIST}${i + 1}`)
          .then(res => {
            vacancies = [...vacancies, ...res.data];
          })
          .catch(error => {
            return commit(types.GET_INITIAL_VACANCIES_FAIL);
          });
      }
      commit(types.GET_INITIAL_VACANCIES_SUCCESS, {
        vacancies,
        totalPages,
        totalVacancies: totalVacancies.data
      });
    } catch (error) {
      commit(types.GET_INITIAL_VACANCIES_FAIL);
    }
  },
  async getVacancies({ commit }, { page }) {
    commit(types.GET_VACANCIES_PAGE);
    axios
      .get(`${BASE_URL}${GET_VACANCY_LIST}${page}`)
      .then(res => {
        commit(types.GET_VACANCIES_PAGE_SUCCESS, { data: res.data });
      })
      .catch(error => {
        return commit(types.GET_VACANCIES_PAGE_FAIL);
      });
  }
};

export default actions;
