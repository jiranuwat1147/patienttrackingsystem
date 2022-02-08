<template>
  <div id="Dashboard">
    <Navbar/>
    <div class="container">
        <div class="d-flex mt-3">
            <div class="text-center alert alert-info w-50" role="alert">
                อุปกรณ์ในระบบจำนวน {{AllDevice}} เครื่อง
            </div>
            <div class="text-center alert alert-success  ms-2 w-50" role="alert">
                อุปกรณ์ออนไลน์จำนวน {{OnlineDevice}} เครื่อง
            </div>
        </div>
        <div class="card w-100">
            <div class="card-body">
            <div class="d-flex justify-content-center">
            <div class="form-group w-100">
                <label for="inputqueue" class="form-label">คิว</label>
                <div class="d-flex">
                    <button class="btn btn-primary me-2 w-25 btn-rounded" :class="(SelectDevice <= 0)?'disabled':''" @click="SelectDevice--"><i class="fas fa-minus"></i></button>
                    <input type="number" min="1" placeholder="หมายเลขคิว" class="disabled input-rounded d-inline form-control text-center" v-model="Device[SelectDevice]" readonly>
                    <button class="btn btn-primary ms-2 w-25 btn-rounded" :class="(SelectDevice >= Device.length-1)?'disabled':''" @click="SelectDevice++"><i class="fas fa-plus"></i></button>
                </div>
                 <button class="btn btn-success mt-2  w-100" @click="sendqueue">เรียกคิว</button>
            </div>
        </div>
            </div>
        </div>
        <div class="d-flex">
            <!-- <div class="alert alert-info w-100"></div> -->
        </div>
        <div class="card w-100 mt-3">
            <div class="card-body">
                <div class="d-flex justify-content-center">
                    <div class="w-100">
                        <label for="" class="form-label">สถานะการเรียกคิว</label>
                        <div v-if="SelectDevice == -1" class="alert alert-secondary">ไม่มีสถานะการเรียกคิว</div>
                        <div v-else-if="SelectDevice != -1" class="alert alert-info">เรียกคิวที่ {{Device[SelectDevice]}}</div>
                        <!-- <div v-else-if="Device != ''" class="alert alert-success">คิวที่ {{Device[SelectDevice]}} ตอบรับ</div> -->
                    </div>
                </div>
            </div>
        </div>
     </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import {Auth, onAuthStateChanged,set,database,ref,onValue} from '../firebase'
export default {
    name:"Dashboard",
    data() {
        return {
            user:null,
            SelectDevice:-1,
            Device:[],
            AllDevice:0,
            OnlineDevice:5,
            NDoC: []
        }
    },
    components:{
        Navbar
    },
    created(){
        onAuthStateChanged(Auth,user =>{
            if(user){
                this.user = user;
            }
        });
        const refAllDevice = ref(database,'Device');
        onValue(refAllDevice,snapshot=>{
            const keys = Object.keys(snapshot.val());
            this.AllDevice = keys.length;
            for(let i = 0; i < keys.length;i++){
                this.Device.push(keys[i].split('Node-')[1])
            }
            this.Device = this.Device.sort((a,b)=>{
                return a - b;
            });
        })
    },
    methods: {
        sendqueue(e){
            e.stopPropagation();
            const DevicePath = "Device/Node-" + this.Device[this.SelectDevice];
            set(ref(database,DevicePath),{
                status: 1
            })
        },
        onlineCheck(){
            
        }
    },
}
</script>

<style scoped>
#Dashboard{
    height: 100vh;
    /* background-image: url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1153&q=80"); */
    background-image: url('../assets/Image6-blur.png');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    

    /* filter: blur(1px); */
    /* -webkit-filter: blur(8px); */
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.card-blur {
    margin-right: auto;
    margin-left: auto;
    /* width: 250px; */
    box-shadow: 0 15px 25px rgba(129, 124, 124, 0.2);
    /* height: 300px; */
    border-radius: 5px;
    backdrop-filter: blur(40px);
    background-color: rgba(255, 255, 255, 0.2);
    /* padding: 10px; */
    /* text-align: center; */
}
/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
.btn.btn-rounded {
    border-radius: 50px;
}
.input-rounded{
    border-radius: 50px;
}
</style>