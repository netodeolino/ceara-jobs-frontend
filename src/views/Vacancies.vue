<template>
  <div>
    <div class="position-relative">
      <!-- shape Hero -->
      <section class="section-shaped my-0">
        <div class="shape shape-style-1 shape-default shape-skew">
        </div>
        <div style="padding-top: 15rem; padding-bottom: 15rem;" class="container shape-container d-flex">
          <div class="col px-0">
            <div class="row">
              <div class="col-lg-7">
                <h1 class="display-3 text-white">
                  As vagas que você tanto sonhou
                  <span>Em um só lugar
                  <i class="fa fa-heart"></i>
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <section class="section section-lg pt-0">
      <div v-if="vacancies == null || vacancies.length == 0" class="loading">
        <img v-lazy="'img/images/loading.gif'" class="rounded-circle img-center img-fluid shadow shadow-lg--hover">
      </div>
      <div v-else class="container cont-card">
        <card gradient="primary" no-body shadow-size="lg" class="border-0"
          v-bind:key="vac.id" v-for="vac in vacancies">
          <div class="p-5">
            <div class="row align-items-center">
              <div class="col-lg-9">
                <h3 class="text-white">{{ vac.title }}</h3>
                <p class="lead text-white mt-3">
                  {{ vac.description }}
                </p>
              </div>
              <div class="col-lg-3 ml-lg-auto">
                <base-image v-if="vac && vac.path_image" :src="vac.path_image" 
                  errorImage="img/theme/img-1-1200x1000.jpg"
                  class="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                  style="margin-bottom: 10px;" />
                <img v-else v-lazy="'img/theme/img-1-1200x1000.jpg'" style="margin-bottom: 10px;"
                  class="rounded-circle img-center img-fluid shadow shadow-lg--hover" />
                <base-button tag="button" type="white" block size="lg" v-on:click="openVacancy(vac.id)">
                  Ver vaga
                </base-button>
              </div>
            </div>
          </div>
        </card>
        <base-pagination align="end" :total="totalVacancies" v-on:input="nextPage" :value="pageValue">
        </base-pagination>
      </div>
    </section>
  </div>
</template>

<script>
import BasePagination from "../components/BasePagination";
import { mapActions, mapState } from "vuex";
export default {
  name: "vacancies",
  components: {
    BasePagination
  },
  data() {
    return {
      vacancies: [],
      paginateIndex: 1,
    };
  },
  created() {
    this.getInitialVacancies();
    if (this.getVacanciesPage)
      this.getVacanciesPage();
  },
  methods: {
    ...mapActions(["getInitialVacancies", "getVacancies"]),
    openVacancy: function(id) {
      this.$router.push({ path: `/vacancy/${id}` });
    },
    nextPage: function(event) {
      this.paginateIndex = event;
      if (this.getVacanciesPage)
        this.getVacanciesPage();
      const nextRequestPage = this.paginateIndex + 4;
      if (this.totalPages >= nextRequestPage)
        this.getVacancies(nextRequestPage);
    }
  },
  computed: {
    ...mapState({
      vacanciesList: (state) => state.vacancy.vacancies,
      totalPages: (state) => state.vacancy.totalPages,
      totalVacancies: state => state.vacancy.totalVacancies,
      loading: state => state.vacancy.loading,
      feedbackTitle: state => state.vacancy.feedbackTitle,
      feedbackMessage: state => state.vacancy.feedbackMessage,
    }),
    getVacanciesPage() {
      if (this.vacanciesList) {
        const startIndex = (this.paginateIndex - 1) * 5;
        const endIndex = startIndex + 5;
        this.vacancies = this.vacanciesList.slice(startIndex, endIndex); 
      }
    },
    totalPagination() {
      return this.totalVacancies;
    },
    pageValue: function() {
      return this.paginateIndex;
    }
  }
};
</script>

<style scoped>
.card {
  margin-bottom: 15px;
}
.cont-card {
  margin-top: -10rem;
  margin-bottom: -2rem;
}
.rounded-circle {
  width: 145px !important;
  height: 140px !important;
}
.loading {
  margin-bottom: 5rem;
}
</style>
