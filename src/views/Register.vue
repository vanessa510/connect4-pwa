<template>
<div class="container pa-6">
<v-form>
    <v-text-field
        placeholder="First name"
        label="First name"
        v-model="firstName"
        clearable
        filled
        ></v-text-field>
        <v-text-field
        placeholder="Last Name"
        label="Last Name"
        v-model="lastName"
        clearable
        filled
    ></v-text-field>
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
     <v-btn class="btn" color="primary" @click="signUp"> Sign Up <v-icon>mdi-arrow-right</v-icon></v-btn>
     <p>  <a to="/login">Already a member? Sign in!</a></p>
</v-form>
</div>
    
</template>

<script>
export default {
    name: "register", 
    
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            emailRegex : [ 
                v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ]
        }
    },
    methods: {
        register() {
            const formData = new FormData();
            formData.append('firstName', this.firstName);
            formData.append('lastName', this.lastName);
            formData.append('email', this.email);
            formData.append('password', this.password);
            formData.append('rememberMe', true);
            this.$store.dispatch("register", formData);
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