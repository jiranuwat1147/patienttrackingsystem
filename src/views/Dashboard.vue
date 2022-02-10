<template>
  <div id="Dashboard">
    <Navbar/>
    <div class="container">
        <div class="d-flex mt-3">
            <div class="text-center alert alert-info w-50" role="alert">
                อุปกรณ์ในระบบจำนวน {{AllDevice}} เครื่อง
            </div>
            <div class="text-center alert alert-success  ms-2 w-50" role="alert">
                อุปกรณ์ออนไลน์จำนวน {{OnlineDevice.length}} เครื่อง
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
                 <button :class="(OnlineDevice.includes(Number(SelectDevice)+1))?'':'disabled'" class="btn btn-success mt-2  w-100" @click="sendqueue">เรียกคิว</button>
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
                        <div v-if="queuestatus == 0" class="alert alert-secondary">ไม่มีสถานะการเรียกคิว</div>
                        <div v-else-if="queuestatus == 1" class="alert alert-info">กำลังเรียกคิวที่ {{queue}} </div>
                        <div v-else-if="queuestatus == 2" class="alert alert-success">คิวที่ {{queue_h}} ตอบรับ</div>
                    </div>
                </div>
            </div>
        </div>
     </div>

  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import {Auth, onAuthStateChanged,set,database,ref,onValue,child} from '../firebase'
export default {
    name:"Dashboard",
    data() {
        return {
            user:null,
            // SelectQueue:this.Device[this.SelectDrive],
            queuestatus:0,
            queue:0,
            queue_h:0,
            SelectDevice:0,
            Device:[],
            AllDevice:0,
            OnlineDevice:[],
            NDoC: [],
            DoC:0,
        }
    },
    components:{
        Navbar
    },
    mounted(){
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
                this.Device[i] = keys[i].split('Node-')[1];
            }
            this.Device = this.Device.sort((a,b)=>{
                return a - b;
            });
            for(let i = 0; i < this.Device.length;i++){
                onValue(child(refAllDevice,`/Node-${this.Device[i]}/NDoC`),snapshot=>{
                    if(snapshot.exists()){
                        this.NDoC[i] = snapshot.val();
                        this.onlineCheck();
                    }
                })
            }
            onValue(child(refAllDevice,`/Node-${this.Device[this.SelectDevice]}/status`),snapshot=>{
                if(snapshot.val() == 0 && this.queuestatus == 1){
                    this.queue_h = this.Device[this.SelectDevice];
                    this.queuestatus = 2;
                }
            })
        })
        const refDoC = ref(database,'DoC');
        onValue(refDoC,snapshot=>{
            this.DoC = snapshot.val();
            this.onlineCheck();
        })
        this.OnlineDevice = this.OnlineDevice.filter(Number);
        setInterval(()=>{
            const DoC = Math.floor(Math.random() * 100);
            set(ref(database,'DoC'),DoC);
        },30000);
    },
    methods: {
        sendqueue(e){
            e.stopPropagation();
            const DevicePath = `Device/Node-${this.Device[this.SelectDevice]}`;
            set(ref(database,DevicePath),{
                status: 1
            })
            this.queue = this.Device[this.SelectDevice];
            this.queuestatus = 1;
        },
        randomDoC(){
            const DoC = Math.floor(Math.random() * 100);
            set(ref(database,'DoC'),DoC);
        },
        onlineCheck(){
            setTimeout((()=>{
                this.OnlineDevice = [];
                for(let i= 0;i<this.Device.length;i++){
                    if(Number(this.DoC) == Number(this.NDoC[i])){
                        this.OnlineDevice[i] = Number(this.Device[i]);
                    }
                }
                this.OnlineDevice = this.OnlineDevice.filter(Number);
            }),1000);
            // this.NDoC = this.NDoC.filter(Number);
        },
        empty(arr){
            arr.lenght = 0;
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