import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import user from "./user";
import vacancy from "./vacancy";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { user, vacancy },
  plugins: [
    createPersistedState({
      reducer: persistedState => {
        const stateFilter = { ...persistedState };
        const blackList = [];
        blackList.forEach(reducer => {
          delete stateFilter[reducer];
        });
        return stateFilter;
      }
    })
  ]
});

export default store;
