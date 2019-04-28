<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default"></div>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template>
              <div class="text-center text-muted mb-4">
                <small>Digite seu email e sua senha</small>
              </div>
              <form role="form" @submit.prevent="onSubmit()">
                <base-input
                  id="email-input"
                  alternative
                  class="mb-3"
                  placeholder="Email"
                  addon-left-icon="fa fa-envelope-o"
                  required
                  v-model="email"
                  :valid="$v.email.required && $v.email.email"
                  :error="errorEmail"
                  v-on:blur="dirtyEmail"
                ></base-input>
                <base-input
                  id="password-input"
                  alternative
                  type="password"
                  placeholder="Senha"
                  addon-left-icon="fa fa-unlock-alt"
                  required
                  v-model="password"
                  :valid="$v.password.required && $v.password.minLength"
                  :error="errorPassword"
                  v-on:blur="dirtyPassword"
                ></base-input>
                <div class="text-center">
                  <button class="btn btn-primary my-4" type="submit">Entrar</button>
                </div>
              </form>
            </template>
          </card>
          <div class="row mt-3">
            <div class="col-6">
              <a href="#" class="text-light">
                <small>Esqueceu sua senha?</small>
              </a>
            </div>
            <div class="col-6 text-right">
              <router-link to="/register" class="text-light">Criar uma nova conta</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  name: "login",
  components: {},
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["doLogin" ]),
    dirtyEmail() {
      this.$v.email.$touch();
    },
    dirtyPassword() {
      this.$v.password.$touch();
    },
    onSubmit() {
      if (!this.validForm()) return;
      this.doLogin({email: this.email, password: this.password});
    },
    validForm() {
      this.dirtyPassword();
      this.dirtyEmail();
      if (this.$v.$invalid) return false;
      return true;
    }
  },
  computed: {
    ...mapState({
      isLogged: state => state.user.isLogged,
      loading: state => state.user.loading,
      feedbackTitle: state => state.user.feedbackTitle,
      feedbackMessage: state => state.user.feedbackMessage,
    }),
    errorEmail() {
      if (!this.$v.email.required && this.$v.email.$dirty) {
        return "Campo obrigatório.";
      }
      if (!this.$v.email.email && this.$v.email.$dirty) {
        return "Formato de email inválido.";
      }
      return null;
    },
    errorPassword() {
      if (!this.$v.password.required && this.$v.password.$dirty) {
        return "Campo obrigatório.";
      }
      if (!this.$v.password.minLength && this.$v.password.$dirty) {
        return `Deve conter no mínimo ${
          this.$v.password.$params.minLength.min
        } caracteres.`;
      }
      return null;
    },
  },
  watch: {
    loading: function(newValue, oldValue) {
      const loadEnd = !newValue && oldValue;
      if (loadEnd) {
        this.$notify({
          group: "not-cea-job",
          title: this.feedbackTitle,
          text: this.feedbackMessage,
          position: "top right",
          type: this.isLogged ? "success" : "error"
        });
        if (this.isLogged) this.$router.push({ path: "/" });
      }
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  }
};
</script>
<style>
</style>
