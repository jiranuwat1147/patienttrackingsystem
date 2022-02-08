<template>
  <div id="Navbar">
      <nav class="navbar navbar-light" style="background-color: #fff;">
          <div class="container">
                <a class="navbar-brand"></a>
                <div class="d-flex align-items-center">
                    <img v-if="user.photoURL" :src="user.photoURL"
                        class="rounded-circle me-2"
                        height="32"
                        alt="profile"
                        loading="lazy"/>
                    <span class="navbar-text me-2" style="width:130px">{{user.displayName}}</span>
                    <button class="btn btn-outline-primary" @click="SignOut">ออกจากระบบ</button>
                </div>
          </div>
      </nav>
  </div>
</template>

<script>
import { Auth, signOut, onAuthStateChanged } from "../firebase";
export default {
  name: "Navbar",
  data() {
    return {
      user:""
    };
  },
  created() {
    onAuthStateChanged(Auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },
  methods: {
    SignOut(e) {
      e.stopPropagation();
      signOut(Auth);
      this.$router.push("/login");
    },
  },
};
</script>

<style></style>
