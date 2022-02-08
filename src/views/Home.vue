<template>
  <div id="Home">
    <div class="container">
      <div class="item">
        <img src="../assets/icon.png" width="120px" alt="">
        <div class="queue">
          <span class="queue-title">ปัจจุบันคิวที่</span>
          <div class="queue-value">{{queue}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {database,ref,onValue} from '../firebase';
export default {
  name: 'Home',
  data() {
    return {
      queue: ""
    }
  },
  mounted() {
    const refqueue = ref(database,'Queue/');
    onValue(refqueue,snapshot=>{
      this.queue = snapshot.val();
    })
  },
}
</script>
<style scoped>
body{
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.item{
    position: relative;
    padding: 0 30px 0 30px;
    text-align: center;
    color:#fff;
}
.queue{
  padding-top: 10px;
}
.queue .queue-value{
  font-size: 20vw;
}
.queue .queue-title{
  font-size: 7vw;
}
.container{
    margin: 0 auto;
    max-width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: url(https://images.unsplash.com/photo-1643916861364-02e63ce3e52f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80); */
    background: url("../assets/Image6-blur.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
}

</style>