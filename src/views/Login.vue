<template>
  <div id="Login">
    <div class="container">
        <div class="item">
            <section id="firebaseui-auth-container"></section>
        </div>
        
    </div>
  </div>
</template>

<script>
import {Authui,FacebookAuthProvider,GoogleAuthProvider,EmailAuthProvider} from '../firebase';
import "firebaseui/dist/firebaseui.css";
export default {
    name:"Login",
    data() {
        return {
            
        }
    },
    // created(){
    //     onAuthStateChanged(Auth,user=>{
    //         if(user){
    //             this.$router.push('dashboard');
    //         }
    //     })
    // },
    mounted(){
        const uiConfig = {
            signInSuccessUrl:"/dashboard",
            signInOptions: [
                FacebookAuthProvider.PROVIDER_ID,
                GoogleAuthProvider.PROVIDER_ID,
                {
                    provider:EmailAuthProvider.PROVIDER_ID,
                    disableSignUp:{
                        status: true,
                        adminEmail: "jiranuwat.k@outlook.com",
                        helpLink: (undefined),
                    }
                }
            ],
            // signInFlow:'popup'
        }
        Authui.start("#firebaseui-auth-container", uiConfig);
    }
}
</script>

<style scoped>
.item{
    position: relative;
    /* padding: 0 30px 0 30px; */
    text-align: center;
}
.container{
    margin: 0 auto;
    max-width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: url(https://images.unsplash.com/photo-1643916861364-02e63ce3e52f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80);
     */
    background: url("../assets/Image5-blur.jpg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>>