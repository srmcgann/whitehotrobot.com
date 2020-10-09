<template>
  <div class="header">
    <div class="workingSpace">
      <div class="loggedinDiv">
        <div v-if="state.loggedin" class="loggedInTitle">
          <span style="color: #afe;font-size: 16px;">Welcome,</span><br>
          <a :href="'/u/' + state.loggedinUserName" v-html="truncate(state.loggedinUserName)"></a>
        </div>
        <Account :state="state"/>
      </div>
      <a :href="origin" class="appName">
        <div class="appNameText">
          Free Web
          Hosting
        </div>
        <div class="clear"></div>
      </a>
    </div>
  </div>
</template>

<script>
import Account from './Account'
export default {
  components: {
    Account
  },
  name: 'Header',
  props: [ 'state' ],
  methods:{
    truncate(str){
      if(typeof str === 'undefined') return
      return str.length > 9 ? str.substring(0,5) + '...' + str.substring(str.length-3) : str
    }
  },
  computed:{
    origin(){
      return window.location.origin
    }
  }
}
</script>

<style>
.appName{
  float: right;
  position: relative;
  top:50%;
  padding: 2px;
  transform: translateY(-50%);
  text-decoration: none;
  background: #1350 url(https://lookie.jsbot.net/uploads/1GY3GM.png) no-repeat;
  background-position: 10px 50%;
  background-size: 50px 50px;
  height: 50px;
  z-index: 100;
  border-radius: 10px;
  min-width: 180px;
  
}
.appNameText{
  position: absolute;
  left: 62%;
  top: 50%;
  color: #f80;
  width: 100%;
  line-height: .8em;
  transform: translate(-50%,-50%);
}
.clear{
  clear: both;
}
.header{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 60px;
  width: 100%;
  background: linear-gradient(90deg, #0008, #0348);
  border-bottom: 1px solid #2ef6;
  font-size: 24px;
  text-align: center;
  overflow: hidden;
}
.workingSpace{
  max-width: 1200px;
  position: relative;
  left: 50%;
  height: 100%;
  transform: translate(-50%);
}
.loggedInTitle{
  position: absolute;
  margin-left: 10px;
  margin-top: 5px;
  top:0;
  left: 0;
  color: #ff6;
  font-size:16px;
  text-align: left;
  line-height: 1.6em;
}
.loggedinDiv{
  position: absolute;
  height: 60px;
  width: 250px;
  top: 0;
}
.username{
  font-size: 1em;
}
a{
  color: #ff0!important;
  text-decoration: none;
}
</style>
