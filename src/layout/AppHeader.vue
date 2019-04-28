<template>
  <header class="header-global">
    <base-nav class="navbar-main" transparent type effect="light" expand>
      <a slot="brand" class="navbar-brand mr-lg-5" href="/#/">
        <img src="img/brand/logo-branca.png">
      </a>

      <div class="row" slot="content-header" slot-scope="{closeMenu}">
        <div class="col-6 collapse-brand">
          <a href="/#/">
            <img src="img/brand/logo-iic.png">
          </a>
        </div>
        <div class="col-6 collapse-close">
          <close-button @click="closeMenu"></close-button>
        </div>
      </div>

      <ul
        class="navbar-nav navbar-nav-hover align-items-lg-center ml-lg-auto"
      >
        <base-dropdown tag="li" class="nav-item">
          <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
            <span v-if="!isLogged">
              <router-link to="/login" class="btn btn-outline-default btn-sm">Entrar</router-link>
            </span>
            <span v-if="isLogged">
              <base-image
                :src="user.path_image"
                errorImage="img/brand/user_default.png"
                class="user-image rounded-circle img-center img-fluid shadow shadow-lg--hover"
              />
            </span>
          </a>
          <router-link
            v-if="isLogged"
            :to="{ name: 'profile', params: { id: user.id } }"
            class="dropdown-item"
          >Ver Perfil</router-link>
          <router-link v-if="!isLogged" to="/register" class="dropdown-item">Cadastre-se</router-link>
          <router-link
            v-if="isLogged"
            to="/register-vacancy"
            class="dropdown-item"
          >Registre uma Vaga</router-link>
          <span v-if="isLogged" v-on:click="logout" class="dropdown-item pointer">Sair</span>
        </base-dropdown>
      </ul>
    </base-nav>
  </header>
</template>
<script>
import { mapState, mapActions } from "vuex";

import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["doLogout"]),
    logout() {
      this.doLogout();
      this.$router.push("/login");
    }
  },
  computed: mapState({
    user: state => state.user.data,
    isLogged: state => state.user.isLogged
  })
};
</script>
<style>
.user-image {
  width: 50px !important;
  height: 50px !important;
}
</style>
