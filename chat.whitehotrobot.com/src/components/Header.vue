<template>
  <div class="header">
    <div class="logo"></div>
    <div v-if="state.loggedin" class="userSettingsButton" @click="state.showUserSettings" :title="'USER SETTINGS\n(Logged in as ' + state.loggedinUserName + ')'"></div>
    <div class="infoButton" title="about whitehot robot" @click="launchInfoPage()"></div>
    <div class="headerText" v-html="state.headerText"></div>
    <div class="headerDescription" v-html="state.headerDescription"></div>
    <button v-if="state.loggedin" class="logoutButton" @click="confirmClose()" title="log out of whitehot robot & IRC">log out</button>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: [ 'state' ],
  data(){
    return {
    }
  },
  methods:{
    confirmClose(){
      if(confirm("\n\nThis will close all your channels!\n\nAre you sure??!??!")){
        this.state.logout()
      }
    },
    launchInfoPage(){
      let a = document.createElement('a')
      a.setAttribute('href', 'https://whitehotrobot.com/about')
      a.setAttribute('target', '_blank')
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      a.parentNode.removeChild(a)
    }
  }
}
</script>

<style rText}}}>
.header{
  position: absolute;
  z-index: 20;
  width: 100%;
  min-height: 30px;
  max-height: 30px;
  background: linear-gradient(90deg, #000, #ace8);
}
.logo{
  width: 28px;
  height: 28px;
  background-image: url(https://lookie.jsbot.net/uploads/1GY3GM.png);
  background-position: center center;
  background-size: 28px 28px;
  margin: 2px;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
}
.headerText{
  margin-left: 40px;
  margin-top: 6px;
  color: #f04;
  font-size: 30px;
  float: left;
  text-shadow: 0 0 5px #83f;
}
.userSettingsButton{
  position:absolute;
  width: 28px;
  height: 28px;
  background-image: url(https://lookie.jsbot.net/uploads/ZSU0m.png);
  background-color: #0024;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 24px 24px;
  margin-top: 1px;
  border-radius: 10px;
  border: none;
  right: 110px;
  z-index: 1000;
}
.logoutButton{
  border: none;
  background: #4f8;
  font-size: 16px;
  border-radius: 10px;
  padding: 5px;
  padding-left: 10px;
  min-width: 0;
  padding-right: 10px;
  right: 35px;
  top: 0;
  margin: 0;
  margin-top: 2px;
  position: absolute;
}
.headerDescription{
  font-style: oblique;
  font-size: 16px;
  left: 220px;
  position: absolute;
  line-height: .85em;
  margin-top: 2px;
  transform: scale(1.75, 1.0);
  color: #fed;
  text-shadow: 2px 2px 2px #000;
}
.infoButton{
  position: relative;
  width: 30px;
  height: 30px;
  top: 0px;
  margin-right: 1px;
  float: right;
  background-image: url(https://lookie.jsbot.net/uploads/WEOZD.png);
  background-repeat: no-repeat;
  background-size: 30px 30px;
  background-position: center center;
  cursor: pointer!important;
  z-index: 1000;
}
</style>
