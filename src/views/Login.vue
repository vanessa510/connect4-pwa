<template>
<div class="container pa-6">
<v-form>
<v-text-field
            placeholder="E-Mail"
            label="E-Mail"
            v-model="email"
            :rules="emailRegex"
            clearable
            filled
          ></v-text-field>
          <v-text-field
            placeholder="password"
            label="Password"
            v-model="password"
            clearable
            filled
            type="password"
            hide-details="auto"
          ></v-text-field>
         <v-btn class="btn" color="primary" @click="login"> Sign In <v-icon>mdi-arrow-right</v-icon></v-btn>
          <p>  <a to="/register">Not a member? Sign up now!</a></p>
         <p> Or sign in with one of your following accounts:</p>
         <v-btn color="red" @click=googleLogIn> <v-icon color="white">mdi-google</v-icon> </v-btn>
        
</v-form>
</div>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            email: '',
            password: '',
            emailRegex : [ 
                v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ]
        }
    },
    methods: {
        login() {
            const formData = new FormData();
            formData.append('email', this.email);
            formData.append('password', this.password);
            formData.append('rememberMe', true);
            this.$store.dispatch("login", formData);
        },
        googleLogIn() {
            this.$store.dispatch("googleLogIn");
        }
    }

}
</script>

<style>

  .btn {
        margin-right: 10px;
        margin-top: 10px;
    }

    .v-text-field {
        width: 50%;
    }

</style>